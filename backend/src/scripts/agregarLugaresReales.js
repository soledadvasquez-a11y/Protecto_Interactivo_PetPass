
import db from '../db.js'

// Parte 7: lugares con ubicación cartográfica conocida.
// verified = 1 confirma la ubicación, NO las condiciones
// de ingreso con mascotas ni los horarios de atención.

const lugares = [
  {
    name: 'Plaza Bolivia',
    category: 'park',
    address: 'Avenida Arce, La Paz, Bolivia',
    latitude: -16.50693,
    longitude: -68.12666,
    description:
      'Plaza pública de La Paz. Consultar las normas vigentes para visitar sus áreas con mascotas.',
  },
  {
    name: 'Parque Mirador Laikakota',
    category: 'park',
    address: 'Avenida del Ejército, La Paz, Bolivia',
    latitude: -16.50320,
    longitude: -68.12422,
    description:
      'Parque mirador de La Paz. Consultar horarios y condiciones de ingreso antes de visitarlo.',
  },
  {
    name: 'SemeVet',
    category: 'veterinary',
    address:
      'Calle República de Cuba 1836, Miraflores, La Paz, Bolivia',
    latitude: -16.50072,
    longitude: -68.12016,
    description:
      'Hospital veterinario en Miraflores. Confirmar disponibilidad y servicios antes de acudir.',
  },
  {
    name: 'Clínica Veterinaria Hocico Spa',
    category: 'veterinary',
    address: 'Avenida Ecuador 2434, Sopocachi, La Paz, Bolivia',
    latitude: -16.51166,
    longitude: -68.12928,
    description:
      'Establecimiento veterinario de Sopocachi. Consultar directamente sus servicios y horarios.',
  },
  {
    name: 'Amanita Café Market',
    category: 'petFriendly',
    address:
      'Avenida Germán Busch 1689, Miraflores, La Paz, Bolivia',
    latitude: -16.49888,
    longitude: -68.12100,
    description:
      'Cafetería presentada como pet-friendly. Confirmar las condiciones de ingreso con mascotas.',
  },
]

const buscar = db.prepare(`
  SELECT id
  FROM places
  WHERE LOWER(name) = LOWER(?)
  LIMIT 1
`)

const insertar = db.prepare(`
  INSERT INTO places (
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
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`)

let transaccionIniciada = false

try {
  db.exec('BEGIN IMMEDIATE')
  transaccionIniciada = true

  for (const lugar of lugares) {
    // Evitar duplicados si ejecutamos el script otra vez.
    if (buscar.get(lugar.name)) {
      console.log(`Ya existe: ${lugar.name}`)
      continue
    }

    const resultado = insertar.run(
      lugar.category,
      lugar.category,
      lugar.name,
      lugar.address,
      null,
      lugar.description,
      null,
      JSON.stringify({}),
      lugar.latitude,
      lugar.longitude,
      1
    )

    console.log(
      `Agregado ID ${resultado.lastInsertRowid}: ${lugar.name}`
    )
  }

  db.exec('COMMIT')
  transaccionIniciada = false

  console.log('\nLugares con GPS registrado:')

  const verificados = db.prepare(`
    SELECT id, name, latitude, longitude
    FROM places
    WHERE verified = 1
    ORDER BY id
  `).all()

  console.table(verificados)
} catch (error) {
  if (transaccionIniciada) {
    db.exec('ROLLBACK')
  }

  console.error('Error al agregar lugares:', error.message)
  throw error
} finally {
  db.close()
}
