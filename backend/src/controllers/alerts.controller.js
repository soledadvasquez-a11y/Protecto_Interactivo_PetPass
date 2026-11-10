import alerts from '../data/alerts.js';
import pets from '../data/pets.js';

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

  const visibleAlerts = alerts.filter(
    (alert) => {
      const matchesType =
        !type || alert.type === type;

      const matchesZone =
        !zone || alert.zone === zone;

      return matchesType && matchesZone;
    }
  );

  return res.json(visibleAlerts);
}

export function getAlertById(req, res) {
  const id = parseNumericId(req.params.id);

  if (id === null) {
    return res.status(400).json({
      error: 'El id debe ser un número',
    });
  }

  const alert = alerts.find(
    (item) => item.id === id
  );

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

    selectedPet = pets.find(
      (pet) => pet.id === petId
    );

    if (!selectedPet) {
      return res.status(404).json({
        error: 'Mascota no encontrada',
      });
    }
  }

  const nextId =
    alerts.length > 0
      ? Math.max(
          ...alerts.map((alert) => alert.id)
        ) + 1
      : 1;

  const newAlert = {
    id: nextId,
    type: req.body.type,
    petId:
      req.body.type === 'lost' && selectedPet
        ? selectedPet.id
        : null,
    petName:
      req.body.type === 'lost'
        ? selectedPet?.name ||
          req.body.petName?.trim() ||
          'Mascota perdida'
        : req.body.type === 'adoption'
          ? req.body.petName?.trim() ||
            'En adopción'
          : 'Emergencia',
    photo:
      req.body.type === 'lost'
        ? selectedPet?.photo ||
          req.body.photo ||
          null
        : req.body.photo || null,
    zone: req.body.zone,
    location:
      req.body.location?.trim() ||
      ZONE_LABELS[req.body.zone],
    date:
      req.body.date ||
      new Date().toISOString().slice(0, 10),
    description: req.body.description.trim(),
    contact: req.body.contact?.trim() || '',
    status: 'active',
  };

  alerts.unshift(newAlert);

  if (
    newAlert.type === 'lost' &&
    selectedPet
  ) {
    selectedPet.status = 'lost';
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

  const alertIndex = alerts.findIndex(
    (alert) => alert.id === id
  );

  if (alertIndex === -1) {
    return res.status(404).json({
      error: 'Alerta no encontrada',
    });
  }

  const currentAlert = alerts[alertIndex];
  const nextStatus =
    req.body.status ?? currentAlert.status;

  if (!ALERT_STATUSES.includes(nextStatus)) {
    return res.status(400).json({
      error: 'Estado de alerta no válido',
    });
  }

  const updatedAlert = {
    ...currentAlert,
    status: nextStatus,
  };

  alerts[alertIndex] = updatedAlert;

  if (
    currentAlert.type === 'lost' &&
    currentAlert.petId !== null &&
    nextStatus === 'resolved'
  ) {
    const hasAnotherActiveLostAlert = alerts.some(
      (alert) =>
        alert.id !== id &&
        alert.type === 'lost' &&
        alert.petId === currentAlert.petId &&
        alert.status === 'active'
    );

    if (!hasAnotherActiveLostAlert) {
      const pet = pets.find(
        (item) => item.id === currentAlert.petId
      );

      if (pet) {
        pet.status = 'normal';
      }
    }
  }

  return res.json(updatedAlert);
}