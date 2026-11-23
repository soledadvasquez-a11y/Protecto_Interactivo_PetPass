import { DatabaseSync } from 'node:sqlite'
import pets from './data/pets.js'
import medicalRecords from './data/medicalRecords.js'
import places from './data/places.js'
import alerts from './data/alerts.js'

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
// también se elimina.
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
// position se guarda como texto JSON.
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
 // PARTE 7 - COORDENADAS GPS DE LUGARES
 // Migración segura para bases de datos existentes.
 // =====================================================

const placeColumns = db
  .prepare('PRAGMA table_info(places)')
  .all()
  .map((column) => column.name)

// Agregar latitud si todavía no existe.
if (!placeColumns.includes('latitude')) {
  db.exec('ALTER TABLE places ADD COLUMN latitude REAL')
}

// Agregar longitud si todavía no existe.
if (!placeColumns.includes('longitude')) {
  db.exec('ALTER TABLE places ADD COLUMN longitude REAL')
}

// 0 = lugar no verificado.
// 1 = ubicación comprobada.
if (!placeColumns.includes('verified')) {
  db.exec(`
    ALTER TABLE places
    ADD COLUMN verified INTEGER NOT NULL DEFAULT 0
  `)
}


// =====================================================
// TABLA ALERTS
// petId es opcional. Si una mascota se elimina, la
// alerta permanece, pero petId pasa a NULL.
// =====================================================
db.exec(`
  CREATE TABLE IF NOT EXISTS alerts (
    id INTEGER PRIMARY KEY,
    type TEXT NOT NULL,
    petId INTEGER,
    petName TEXT,
    photo TEXT,
    zone TEXT NOT NULL,
    location TEXT,
    date TEXT,
    description TEXT NOT NULL,
    contact TEXT,
    status TEXT NOT NULL,
    FOREIGN KEY (petId)
      REFERENCES pets(id)
      ON DELETE SET NULL
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
    position,
    latitude,
    longitude,
    verified
  )
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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

    // Posición visual para compatibilidad web.
    JSON.stringify(place.position ?? {}),

    // Coordenadas reales para el mapa móvil.
    Number.isFinite(place.latitude)
      ? place.latitude
      : null,

    Number.isFinite(place.longitude)
      ? place.longitude
      : null,

    // 1 = ubicación comprobada; 0 = demostración.
    place.verified === 1 ? 1 : 0
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

// =====================================================
// SEED ALERTS
// Se ejecuta después de pets porque una alerta puede
// tener un petId asociado.
// =====================================================
const { total: totalAlerts } = db
  .prepare('SELECT COUNT(*) AS total FROM alerts')
  .get()

if (totalAlerts === 0) {
  const insertAlert = db.prepare(`
    INSERT INTO alerts (
      id,
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
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)

  for (const alert of alerts) {
    insertAlert.run(
      alert.id,
      alert.type,
      alert.petId,
      alert.petName,
      alert.photo,
      alert.zone,
      alert.location,
      alert.date,
      alert.description,
      alert.contact,
      alert.status
    )
  }

  console.log(
    `Seed alerts: ${alerts.length} alertas cargadas`
  )
} else {
  console.log(
    `Seed alerts omitido: la tabla ya tiene ${totalAlerts} alertas`
  )
}

// =====================================================
// VERIFICACIÓN DE INTEGRIDAD RELACIONAL
// =====================================================
const foreignKeyState = db
  .prepare('PRAGMA foreign_keys')
  .get()

if (foreignKeyState.foreign_keys !== 1) {
  throw new Error(
    'SQLite inició sin foreign_keys habilitado'
  )
}

const foreignKeyViolations = db
  .prepare('PRAGMA foreign_key_check')
  .all()

if (foreignKeyViolations.length > 0) {
  console.error(
    'Violaciones de claves foráneas:',
    foreignKeyViolations
  )

  throw new Error(
    'La base de datos contiene referencias inválidas'
  )
}

export default db