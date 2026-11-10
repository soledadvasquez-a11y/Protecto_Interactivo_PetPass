import pets from '../data/pets.js';
import medicalRecords from '../data/medicalRecords.js';
import alerts from '../data/alerts.js';

const PET_SPECIES = ['Perro', 'Gato'];
const PET_STATUSES = ['normal', 'lost'];

function parseNumericId(value) {
  const id = Number(value);

  return Number.isNaN(id) ? null : id;
}

function validatePetPayload(body = {}) {
  if (
    typeof body.name !== 'string' ||
    !body.name.trim()
  ) {
    return 'El nombre es obligatorio';
  }

  if (!PET_SPECIES.includes(body.species)) {
    return 'Especie no válida';
  }

  if (
    body.status &&
    !PET_STATUSES.includes(body.status)
  ) {
    return 'Estado de mascota no válido';
  }

  return '';
}

export function getPets(req, res) {
  const species = req.query.especie;

  if (
    species &&
    !PET_SPECIES.includes(species)
  ) {
    return res.status(400).json({
      error: 'Especie no válida',
    });
  }

  const visiblePets = species
    ? pets.filter(
        (pet) => pet.species === species
      )
    : pets;

  return res.json(visiblePets);
}

export function getPetById(req, res) {
  const id = parseNumericId(req.params.id);

  if (id === null) {
    return res.status(400).json({
      error: 'El id debe ser un número',
    });
  }

  const pet = pets.find(
    (item) => item.id === id
  );

  if (!pet) {
    return res.status(404).json({
      error: 'Mascota no encontrada',
    });
  }

  return res.json(pet);
}

export function createPet(req, res) {
  const validationError = validatePetPayload(
    req.body
  );

  if (validationError) {
    return res.status(400).json({
      error: validationError,
    });
  }

  const nextId =
    pets.length > 0
      ? Math.max(
          ...pets.map((pet) => pet.id)
        ) + 1
      : 1;

  const newPet = {
    id: nextId,
    name: req.body.name.trim(),
    photo: req.body.photo || null,
    species: req.body.species,
    breed: req.body.breed?.trim() || '',
    age: req.body.age?.trim() || '',
    weight: req.body.weight?.trim() || '',
    sex: req.body.sex?.trim() || '',
    color: req.body.color?.trim() || '',
    birthDate: req.body.birthDate || '',
    status: req.body.status || 'normal',
  };

  pets.push(newPet);

  return res.status(201).json(newPet);
}

export function updatePet(req, res) {
  const id = parseNumericId(req.params.id);

  if (id === null) {
    return res.status(400).json({
      error: 'El id debe ser un número',
    });
  }

  const petIndex = pets.findIndex(
    (pet) => pet.id === id
  );

  if (petIndex === -1) {
    return res.status(404).json({
      error: 'Mascota no encontrada',
    });
  }

  const currentPet = pets[petIndex];

  const candidatePet = {
    ...currentPet,
    ...req.body,
    id,
  };

  const validationError = validatePetPayload(
    candidatePet
  );

  if (validationError) {
    return res.status(400).json({
      error: validationError,
    });
  }

  const updatedPet = {
    ...currentPet,
    name: candidatePet.name.trim(),
    photo: candidatePet.photo || null,
    species: candidatePet.species,
    breed: candidatePet.breed?.trim() || '',
    age: candidatePet.age?.trim() || '',
    weight: candidatePet.weight?.trim() || '',
    sex: candidatePet.sex?.trim() || '',
    color: candidatePet.color?.trim() || '',
    birthDate: candidatePet.birthDate || '',
    status: candidatePet.status || 'normal',
  };

  pets[petIndex] = updatedPet;

  return res.json(updatedPet);
}

export function deletePet(req, res) {
  const id = parseNumericId(req.params.id);

  if (id === null) {
    return res.status(400).json({
      error: 'El id debe ser un número',
    });
  }

  const petIndex = pets.findIndex(
    (pet) => pet.id === id
  );

  if (petIndex === -1) {
    return res.status(404).json({
      error: 'Mascota no encontrada',
    });
  }

  // Eliminar la mascota
  pets.splice(petIndex, 1);

  // Eliminar todos sus registros médicos
  for (
    let index = medicalRecords.length - 1;
    index >= 0;
    index -= 1
  ) {
    if (medicalRecords[index].petId === id) {
      medicalRecords.splice(index, 1);
    }
  }

  // Mantener las alertas, pero quitar la referencia
  // a una mascota que ya no existe.
  alerts.forEach((alert) => {
    if (alert.petId === id) {
      alert.petId = null;
    }
  });

  return res.status(204).send();
}