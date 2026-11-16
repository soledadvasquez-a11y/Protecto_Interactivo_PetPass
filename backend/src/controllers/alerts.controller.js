import db from '../db.js';

const ALERT_TYPES = [
  'lost',
  'adoption',
  'emergency',
];

const ALERT_ZONES = [
  'sopocachi',
  'miraflores',
  'zona-sur',
  'el-alto',
  'centro',
];

const ALERT_STATUSES = [
  'active',
  'resolved',
];

const ZONE_LABELS = {
  sopocachi: 'Sopocachi, La Paz',
  miraflores: 'Miraflores, La Paz',
  'zona-sur': 'Zona Sur, La Paz',
  'el-alto': 'El Alto',
  centro: 'Centro, La Paz',
};

function parseNumericId(value) {
  const id = Number(value);
  return Number.isNaN(id) ? null : id;
}

function validateAlertPayload(body) {
  if (!ALERT_TYPES.includes(body.type)) {
    return 'Tipo de alerta no válido';
  }

  if (!ALERT_ZONES.includes(body.zone)) {
    return 'Zona no válida';
  }

  if (!body.description?.trim()) {
    return 'La descripción es obligatoria';
  }

  return '';
}

function findAlert(id) {
  return db
    .prepare('SELECT * FROM alerts WHERE id = ?')
    .get(id);
}

export function getAlerts(req, res) {
  const type = req.query.type;
  const zone = req.query.zone;

  if (type && !ALERT_TYPES.includes(type)) {
    return res.status(400).json({
      error: 'Tipo de alerta no válido',
    });
  }

  if (zone && !ALERT_ZONES.includes(zone)) {
    return res.status(400).json({
      error: 'Zona no válida',
    });
  }

  const conditions = [];
  const params = [];

  if (type) {
    conditions.push('type = ?');
    params.push(type);
  }

  if (zone) {
    conditions.push('zone = ?');
    params.push(zone);
  }

  let sql = 'SELECT * FROM alerts';

  if (conditions.length > 0) {
    sql += ` WHERE ${conditions.join(' AND ')}`;
  }

  sql += ' ORDER BY id ASC';

  const rows = db.prepare(sql).all(...params);

  return res.json(rows);
}

export function getAlertById(req, res) {
  const id = parseNumericId(req.params.id);

  if (id === null) {
    return res.status(400).json({
      error: 'El id debe ser un número',
    });
  }

  const alert = findAlert(id);

  if (!alert) {
    return res.status(404).json({
      error: 'Alerta no encontrada',
    });
  }

  return res.json(alert);
}

export function createAlert(req, res) {
  const validationError = validateAlertPayload(
    req.body
  );

  if (validationError) {
    return res.status(400).json({
      error: validationError,
    });
  }

  let selectedPet = null;

  if (
    req.body.petId !== null &&
    req.body.petId !== undefined &&
    req.body.petId !== ''
  ) {
    const petId = parseNumericId(req.body.petId);

    if (petId === null) {
      return res.status(400).json({
        error: 'El id de mascota debe ser un número',
      });
    }

    selectedPet = db
      .prepare('SELECT * FROM pets WHERE id = ?')
      .get(petId);

    if (!selectedPet) {
      return res.status(404).json({
        error: 'Mascota no encontrada',
      });
    }
  }

  const type = req.body.type;

  const petId =
    type === 'lost' && selectedPet
      ? selectedPet.id
      : null;

  const petName =
    type === 'lost'
      ? selectedPet?.name ||
        req.body.petName?.trim() ||
        'Mascota perdida'
      : type === 'adoption'
        ? req.body.petName?.trim() ||
          'En adopción'
        : 'Emergencia';

  const photo =
    type === 'lost'
      ? selectedPet?.photo || req.body.photo || null
      : req.body.photo || null;

  const location =
    req.body.location?.trim() ||
    ZONE_LABELS[req.body.zone];

  const date =
    req.body.date ||
    new Date().toISOString().slice(0, 10);

  const result = db
    .prepare(`
      INSERT INTO alerts (
        type,
        petId,
        petName,
        photo,
        zone,
        location,
        date,
        description,
        contact,
        status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'active')
    `)
    .run(
      type,
      petId,
      petName,
      photo,
      req.body.zone,
      location,
      date,
      req.body.description.trim(),
      req.body.contact?.trim() || ''
    );

  const newAlert = findAlert(
    Number(result.lastInsertRowid)
  );

  if (newAlert.type === 'lost' && selectedPet) {
    db.prepare(`
      UPDATE pets
      SET status = 'lost'
      WHERE id = ?
    `).run(selectedPet.id);
  }

  return res.status(201).json(newAlert);
}

export function updateAlert(req, res) {
  const id = parseNumericId(req.params.id);

  if (id === null) {
    return res.status(400).json({
      error: 'El id debe ser un número',
    });
  }

  const currentAlert = findAlert(id);

  if (!currentAlert) {
    return res.status(404).json({
      error: 'Alerta no encontrada',
    });
  }

  const nextStatus =
    req.body.status ?? currentAlert.status;

  if (!ALERT_STATUSES.includes(nextStatus)) {
    return res.status(400).json({
      error: 'Estado de alerta no válido',
    });
  }

  db.prepare(`
    UPDATE alerts
    SET status = ?
    WHERE id = ?
  `).run(nextStatus, id);

  if (
    currentAlert.type === 'lost' &&
    currentAlert.petId !== null &&
    nextStatus === 'resolved'
  ) {
    const anotherActiveLostAlert = db
      .prepare(`
        SELECT id
        FROM alerts
        WHERE
          id <> ?
          AND type = 'lost'
          AND petId = ?
          AND status = 'active'
        LIMIT 1
      `)
      .get(id, currentAlert.petId);

    if (!anotherActiveLostAlert) {
      db.prepare(`
        UPDATE pets
        SET status = 'normal'
        WHERE id = ?
      `).run(currentAlert.petId);
    }
  }

  return res.json(findAlert(id));
}