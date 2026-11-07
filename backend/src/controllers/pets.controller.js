import pets from '../data/pets.js';

const PET_SPECIES = ['Perro', 'Gato'];

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

  res.json(visiblePets);
}

export function getPetById(req, res) {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
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

  res.json(pet);
}