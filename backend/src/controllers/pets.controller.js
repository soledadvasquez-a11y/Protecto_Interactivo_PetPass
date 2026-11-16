import db from '../db.js';

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

function findPet(id) {
  return db
    .prepare('SELECT * FROM pets WHERE id = ?')
    .get(id);
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

  const rows = species
    ? db
        .prepare(`
          SELECT *
          FROM pets
          WHERE species = ?
          ORDER BY id ASC
        `)
        .all(species)
    : db
        .prepare(`
          SELECT *
          FROM pets
          ORDER BY id ASC
        `)
        .all();

  return res.json(rows);
}

export function getPetById(req, res) {
  const id = parseNumericId(req.params.id);

  if (id === null) {
    return res.status(400).json({
      error: 'El id debe ser un número',
    });
  }

  const pet = findPet(id);

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

  const result = db
    .prepare(`
      INSERT INTO pets (
        name,
        photo,
        species,
        breed,
        age,
        weight,
        sex,
        color,
        birthDate,
        status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)
    .run(
      req.body.name.trim(),
      req.body.photo || null,
      req.body.species,
      req.body.breed?.trim() || '',
      req.body.age?.trim() || '',
      req.body.weight?.trim() || '',
      req.body.sex?.trim() || '',
      req.body.color?.trim() || '',
      req.body.birthDate || '',
      req.body.status || 'normal'
    );

  const newPet = findPet(
    Number(result.lastInsertRowid)
  );

  return res.status(201).json(newPet);
}

export function updatePet(req, res) {
  const id = parseNumericId(req.params.id);

  if (id === null) {
    return res.status(400).json({
      error: 'El id debe ser un número',
    });
  }

  const currentPet = findPet(id);

  if (!currentPet) {
    return res.status(404).json({
      error: 'Mascota no encontrada',
    });
  }

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

  db.prepare(`
    UPDATE pets
    SET
      name = ?,
      photo = ?,
      species = ?,
      breed = ?,
      age = ?,
      weight = ?,
      sex = ?,
      color = ?,
      birthDate = ?,
      status = ?
    WHERE id = ?
  `).run(
    candidatePet.name.trim(),
    candidatePet.photo || null,
    candidatePet.species,
    candidatePet.breed?.trim() || '',
    candidatePet.age?.trim() || '',
    candidatePet.weight?.trim() || '',
    candidatePet.sex?.trim() || '',
    candidatePet.color?.trim() || '',
    candidatePet.birthDate || '',
    candidatePet.status || 'normal',
    id
  );

  return res.json(findPet(id));
}

export function deletePet(req, res) {
  const id = parseNumericId(req.params.id);

  if (id === null) {
    return res.status(400).json({
      error: 'El id debe ser un número',
    });
  }

  const pet = findPet(id);

  if (!pet) {
    return res.status(404).json({
      error: 'Mascota no encontrada',
    });
  }

  db.prepare('DELETE FROM pets WHERE id = ?').run(id);

  return res.status(204).send();
}