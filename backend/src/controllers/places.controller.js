import places from '../data/places.js';

const PLACE_CATEGORIES = [
  'park',
  'veterinary',
  'petFriendly',
];

function parseNumericId(value) {
  const id = Number(value);
  return Number.isNaN(id) ? null : id;
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

  let visiblePlaces = places;

  if (category && category !== 'all') {
    visiblePlaces = visiblePlaces.filter(
      (place) => place.category === category
    );
  }

  if (query) {
    visiblePlaces = visiblePlaces.filter(
      (place) =>
        place.name.toLowerCase().includes(query) ||
        place.address.toLowerCase().includes(query)
    );
  }

  return res.json(visiblePlaces);
}

export function getPlaceById(req, res) {
  const id = parseNumericId(req.params.id);

  if (id === null) {
    return res.status(400).json({
      error: 'El id debe ser un número',
    });
  }

  const place = places.find(
    (item) => item.id === id
  );

  if (!place) {
    return res.status(404).json({
      error: 'Lugar no encontrado',
    });
  }

  return res.json(place);
}