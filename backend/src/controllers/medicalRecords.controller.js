import medicalRecords from '../data/medicalRecords.js';
import pets from '../data/pets.js';

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

export function getMedicalRecordsByPet(req, res) {
  const petId = parseNumericId(req.params.petId);

  if (petId === null) {
    return res.status(400).json({
      error: 'El id de mascota debe ser un número',
    });
  }

  const petExists = pets.some(
    (pet) => pet.id === petId
  );

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

  const petRecords = medicalRecords.filter(
    (record) => record.petId === petId
  );

  const visibleRecords = type
    ? petRecords.filter(
        (record) => record.type === type
      )
    : petRecords;

  return res.json(visibleRecords);
}

export function getMedicalRecordById(req, res) {
  const id = parseNumericId(req.params.id);

  if (id === null) {
    return res.status(400).json({
      error: 'El id debe ser un número',
    });
  }

  const record = medicalRecords.find(
    (item) => item.id === id
  );

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

  const petExists = pets.some(
    (pet) => pet.id === petId
  );

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

  const nextId =
    medicalRecords.length > 0
      ? Math.max(
          ...medicalRecords.map(
            (record) => record.id
          )
        ) + 1
      : 1;

  const newRecord = {
    id: nextId,
    petId,
    type: req.body.type,
    title: req.body.title.trim(),
    date: req.body.date,
    nextDate: req.body.nextDate || '',
    place: req.body.place?.trim() || '',
    description:
      req.body.description?.trim() || '',
  };

  medicalRecords.push(newRecord);

  return res.status(201).json(newRecord);
}

export function updateMedicalRecord(req, res) {
  const id = parseNumericId(req.params.id);

  if (id === null) {
    return res.status(400).json({
      error: 'El id debe ser un número',
    });
  }

  const recordIndex = medicalRecords.findIndex(
    (record) => record.id === id
  );

  if (recordIndex === -1) {
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

  const currentRecord = medicalRecords[recordIndex];

  const updatedRecord = {
    ...currentRecord,
    type: req.body.type,
    title: req.body.title.trim(),
    date: req.body.date,
    nextDate: req.body.nextDate || '',
    place: req.body.place?.trim() || '',
    description:
      req.body.description?.trim() || '',
  };

  medicalRecords[recordIndex] = updatedRecord;

  return res.json(updatedRecord);
}
