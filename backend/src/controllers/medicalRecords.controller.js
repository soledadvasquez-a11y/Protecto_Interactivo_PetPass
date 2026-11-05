import medicalRecords from '../data/medicalRecords.js';
import pets from '../data/pets.js';

export function getMedicalRecordsByPet(req, res) {
  const petId = Number(req.params.petId);

  const petExists = pets.some(
    (pet) => pet.id === petId
  );

  if (!petExists) {
    return res.status(404).json({
      error: 'Mascota no encontrada',
    });
  }

  const type = req.query.type;

  const petRecords = medicalRecords.filter(
    (record) => record.petId === petId
  );

  const visibleRecords = type
    ? petRecords.filter(
        (record) => record.type === type
      )
    : petRecords;

  res.json(visibleRecords);
}

export function getMedicalRecordById(req, res) {
  const record = medicalRecords.find(
    (item) =>
      item.id === Number(req.params.id)
  );

  if (!record) {
    return res.status(404).json({
      error: 'Registro médico no encontrado',
    });
  }

  res.json(record);
}