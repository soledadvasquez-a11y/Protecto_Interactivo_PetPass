import { DatabaseSync } from 'node:sqlite'
import pets from './data/pets.js'

const db = new DatabaseSync('petpass.db')

// SQLite no aplica claves foráneas automáticamente.
// Las activamos desde el inicio para las tablas que se
// agregarán en las siguientes ramas.
db.exec('PRAGMA foreign_keys = ON')

// Tabla pets: conserva los nombres y formatos que ya usa
// la API actual de PetPass.
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

// Seed inicial: solo se ejecuta si la tabla está vacía.
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

export default db