import places from '../data/places.js';

export function getPlaces(req, res) {
  const category = req.query.category;

  const query = (req.query.q || '')
    .trim()
    .toLowerCase();

  let visiblePlaces = places;

  if (
    category &&
    category !== 'all'
  ) {
    visiblePlaces =
      visiblePlaces.filter(
        (place) =>
          place.category === category
      );
  }

  if (query) {
    visiblePlaces =
      visiblePlaces.filter(
        (place) =>
          place.name
            .toLowerCase()
            .includes(query) ||
          place.address
            .toLowerCase()
            .includes(query)
      );
  }

  res.json(visiblePlaces);
}

export function getPlaceById(
  req,
  res
) {
  const place = places.find(
    (item) =>
      item.id ===
      Number(req.params.id)
  );

  if (!place) {
    return res.status(404).json({
      error: 'Lugar no encontrado',
    });
  }

  res.json(place);
}