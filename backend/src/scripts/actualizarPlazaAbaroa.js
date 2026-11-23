
import db from '../db.js'

// Parte 7: actualizar solamente Plaza Abaroa.
// No se eliminan mascotas, historiales ni alertas.

// Buscamos el registro de demostración existente.
const place = db
  .prepare('SELECT id, name FROM places WHERE id = ?')
  .get(5)

// Evitar modificar accidentalmente otro lugar.
if (
  !place ||
  !['Plaza Abaroa Pet Zone', 'Plaza Abaroa'].includes(place.name)
) {
  db.close()
  throw new Error(
    'El registro 5 no corresponde a Plaza Abaroa.'
  )
}

// Actualizamos sus datos reales y coordenadas.
const updatePlace = db.prepare(`
  UPDATE places
  SET
    name = ?,
    address = ?,
    schedule = ?,
    description = ?,
    photo = ?,
    latitude = ?,
    longitude = ?,
    verified = ?
  WHERE id = ?
`)

updatePlace.run(
  'Plaza Abaroa',
  'Sopocachi, La Paz, Bolivia',
  null,
  'Plaza pública de Sopocachi. Consulta las normas vigentes para visitar sus áreas con mascotas.',
  null,
  -16.51062,
  -68.12672,
  1,
  5
)

// Comprobamos el resultado.
const updated = db
  .prepare(`
    SELECT id, name, latitude, longitude, verified
    FROM places
    WHERE id = ?
  `)
  .get(5)

console.log('Lugar actualizado:', updated)

db.close()
