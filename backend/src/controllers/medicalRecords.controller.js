import db from '../db.js';

const MEDICAL_TYPES = [
  'vaccine',
  'deworming',
  'consultation',
];

function parseNumericId(value) {
  const id = Number(value);
  return Number.isNaN(id) ? null : id;
}

function validateMedicalPayload(body) {
  if (!MEDICAL_TYPES.includes(body.type)) {
    return 'Tipo de registro no válido';
  }

  if (!body.title?.trim()) {
    return 'El título es obligatorio';
  }

  if (!body.date) {
    return 'La fecha es obligatoria';
  }

  return '';
}

function findMedicalRecord(id) {
  return db
    .prepare(
      'SELECT * FROM medical_records WHERE id = ?'
    )
    .get(id);
}

export function getMedicalRecordsByPet(req, res) {
  const petId = parseNumericId(req.params.petId);

  if (petId === null) {
    return res.status(400).json({
      error: 'El id de mascota debe ser un número',
    });
  }

  const petExists = db
    .prepare('SELECT id FROM pets WHERE id = ?')
    .get(petId);

  if (!petExists) {
    return res.status(404).json({
      error: 'Mascota no encontrada',
    });
  }

  const type = req.query.type;

  if (type && !MEDICAL_TYPES.includes(type)) {
    return res.status(400).json({
      error: 'Tipo de registro no válido',
    });
  }

  const rows = type
    ? db
        .prepare(`
          SELECT *
          FROM medical_records
          WHERE petId = ? AND type = ?
          ORDER BY id ASC
        `)
        .all(petId, type)
    : db
        .prepare(`
          SELECT *
          FROM medical_records
          WHERE petId = ?
          ORDER BY id ASC
        `)
        .all(petId);

  return res.json(rows);
}

export function getMedicalRecordById(req, res) {
  const id = parseNumericId(req.params.id);

  if (id === null) {
    return res.status(400).json({
      error: 'El id debe ser un número',
    });
  }

  const record = findMedicalRecord(id);

  if (!record) {
    return res.status(404).json({
      error: 'Registro médico no encontrado',
    });
  }

  return res.json(record);
}

export function createMedicalRecord(req, res) {
  const petId = parseNumericId(req.params.petId);

  if (petId === null) {
    return res.status(400).json({
      error: 'El id de mascota debe ser un número',
    });
  }

  const petExists = db
    .prepare('SELECT id FROM pets WHERE id = ?')
    .get(petId);

  if (!petExists) {
    return res.status(404).json({
      error: 'Mascota no encontrada',
    });
  }

  const validationError = validateMedicalPayload(
    req.body
  );

  if (validationError) {
    return res.status(400).json({
      error: validationError,
    });
  }

  const result = db
    .prepare(`
      INSERT INTO medical_records (
        petId,
        type,
        title,
        date,
        nextDate,
        place,
        description
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `)
    .run(
      petId,
      req.body.type,
      req.body.title.trim(),
      req.body.date,
      req.body.nextDate || '',
      req.body.place?.trim() || '',
      req.body.description?.trim() || ''
    );

  const newRecord = findMedicalRecord(
    Number(result.lastInsertRowid)
  );

  return res.status(201).json(newRecord);
}

export function updateMedicalRecord(req, res) {
  const id = parseNumericId(req.params.id);

  if (id === null) {
    return res.status(400).json({
      error: 'El id debe ser un número',
    });
  }

  const currentRecord = findMedicalRecord(id);

  if (!currentRecord) {
    return res.status(404).json({
      error: 'Registro médico no encontrado',
    });
  }

  const validationError = validateMedicalPayload(
    req.body
  );

  if (validationError) {
    return res.status(400).json({
      error: validationError,
    });
  }

  db.prepare(`
    UPDATE medical_records
    SET
      type = ?,
      title = ?,
      date = ?,
      nextDate = ?,
      place = ?,
      description = ?
    WHERE id = ?
  `).run(
    req.body.type,
    req.body.title.trim(),
    req.body.date,
    req.body.nextDate || '',
    req.body.place?.trim() || '',
    req.body.description?.trim() || '',
    id
  );

  return res.json(findMedicalRecord(id));
}