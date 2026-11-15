import { DatabaseSync } from 'node:sqlite'
import pets from './data/pets.js'
import medicalRecords from './data/medicalRecords.js'
import places from './data/places.js'

const db = new DatabaseSync('petpass.db')

db.exec('PRAGMA foreign_keys = ON')

// =====================================================
// TABLA PETS
// =====================================================
db.exec(`
  CREATE TABLE IF NOT EXISTS pets (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    photo TEXT,
    species TEXT NOT NULL,
    breed TEXT,
    age TEXT,
    weight TEXT,
    sex TEXT,
    color TEXT,
    birthDate TEXT,
    status TEXT NOT NULL
  )
`)

// =====================================================
// TABLA MEDICAL_RECORDS
// Si se elimina una mascota, su historial médico
// también debe eliminarse.
// =====================================================
db.exec(`
  CREATE TABLE IF NOT EXISTS medical_records (
    id INTEGER PRIMARY KEY,
    petId INTEGER NOT NULL,
    type TEXT NOT NULL,
    title TEXT NOT NULL,
    date TEXT NOT NULL,
    nextDate TEXT,
    place TEXT,
    description TEXT,
    FOREIGN KEY (petId)
      REFERENCES pets(id)
      ON DELETE CASCADE
  )
`)

// =====================================================
// TABLA PLACES
// position se almacena como texto JSON.
// =====================================================
db.exec(`
  CREATE TABLE IF NOT EXISTS places (
    id INTEGER PRIMARY KEY,
    category TEXT NOT NULL,
    type TEXT NOT NULL,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    schedule TEXT,
    description TEXT,
    photo TEXT,
    position TEXT NOT NULL
  )
`)

// =====================================================
// SEED PETS
// =====================================================
const { total: totalPets } = db
  .prepare('SELECT COUNT(*) AS total FROM pets')
  .get()

if (totalPets === 0) {
  const insertPet = db.prepare(`
    INSERT INTO pets (
      id,
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
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)

  for (const pet of pets) {
    insertPet.run(
      pet.id,
      pet.name,
      pet.photo,
      pet.species,
      pet.breed,
      pet.age,
      pet.weight,
      pet.sex,
      pet.color,
      pet.birthDate,
      pet.status
    )
  }

  console.log(
    `Seed pets: ${pets.length} mascotas cargadas`
  )
} else {
  console.log(
    `Seed pets omitido: la tabla ya tiene ${totalPets} mascotas`
  )
}

// =====================================================
// SEED MEDICAL_RECORDS
// Se ejecuta después de pets porque petId es FK.
// =====================================================
const { total: totalMedicalRecords } = db
  .prepare(
    'SELECT COUNT(*) AS total FROM medical_records'
  )
  .get()

if (totalMedicalRecords === 0) {
  const insertMedicalRecord = db.prepare(`
    INSERT INTO medical_records (
      id,
      petId,
      type,
      title,
      date,
      nextDate,
      place,
      description
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `)

  for (const record of medicalRecords) {
    insertMedicalRecord.run(
      record.id,
      record.petId,
      record.type,
      record.title,
      record.date,
      record.nextDate,
      record.place,
      record.description
    )
  }

  console.log(
    `Seed medical_records: ${medicalRecords.length} registros cargados`
  )
} else {
  console.log(
    `Seed medical_records omitido: la tabla ya tiene ${totalMedicalRecords} registros`
  )
}

// =====================================================
// SEED PLACES
// position es un objeto JS y se convierte a texto JSON.
// =====================================================
const { total: totalPlaces } = db
  .prepare('SELECT COUNT(*) AS total FROM places')
  .get()

if (totalPlaces === 0) {
  const insertPlace = db.prepare(`
    INSERT INTO places (
      id,
      category,
      type,
      name,
      address,
      schedule,
      description,
      photo,
      position
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)

  for (const place of places) {
    insertPlace.run(
      place.id,
      place.category,
      place.type,
      place.name,
      place.address,
      place.schedule,
      place.description,
      place.photo,
      JSON.stringify(place.position)
    )
  }

  console.log(
    `Seed places: ${places.length} lugares cargados`
  )
} else {
  console.log(
    `Seed places omitido: la tabla ya tiene ${totalPlaces} lugares`
  )
}

export default db