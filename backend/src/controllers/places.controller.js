import db from '../db.js';

const PLACE_CATEGORIES = [
  'park',
  'veterinary',
  'petFriendly',
];

function parseNumericId(value) {
  const id = Number(value);
  return Number.isNaN(id) ? null : id;
}


function toPlace(row) {
  return {
    ...row,

    // Compatibilidad con el mapa ilustrado anterior.
    position: JSON.parse(row.position),

    // Parte 7: indicador utilizado por el mapa nativo.
    // Solo mostramos como verificados los lugares
    // cuya ubicación haya sido comprobada.
    locationVerified: row.verified === 1,
  };
}


export function getPlaces(req, res) {
  const category = req.query.category;

  if (
    category &&
    category !== 'all' &&
    !PLACE_CATEGORIES.includes(category)
  ) {
    return res.status(400).json({
      error: 'Categoría no válida',
    });
  }

  const query = (req.query.q || '')
    .trim()
    .toLowerCase();

  const conditions = [];
  const params = [];

  if (category && category !== 'all') {
    conditions.push('category = ?');
    params.push(category);
  }

  if (query) {
    conditions.push(
      '(LOWER(name) LIKE ? OR LOWER(address) LIKE ?)'
    );
    const pattern = `%${query}%`;
    params.push(pattern, pattern);
  }

  let sql = 'SELECT * FROM places';

  if (conditions.length > 0) {
    sql += ` WHERE ${conditions.join(' AND ')}`;
  }

  sql += ' ORDER BY id ASC';

  const rows = db.prepare(sql).all(...params);

  return res.json(rows.map(toPlace));
}

export function getPlaceById(req, res) {
  const id = parseNumericId(req.params.id);

  if (id === null) {
    return res.status(400).json({
      error: 'El id debe ser un número',
    });
  }

  const place = db
    .prepare('SELECT * FROM places WHERE id = ?')
    .get(id);

  if (!place) {
    return res.status(404).json({
      error: 'Lugar no encontrado',
    });
  }

  return res.json(toPlace(place));
}