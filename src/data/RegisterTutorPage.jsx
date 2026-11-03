const filteredAlerts = alerts.filter((alert) => {
  const matchesType = activeFilter === 'Todos' || alert.type === filterToType[activeFilter];
  const matchesZone = !selectedZone || alert.zone === selectedZone;
  return matchesType && matchesZone;
});
const filteredPlaces = places.filter((place) => {
  const matchesCategory = activeCategory === 'all' || place.category === activeCategory;
  const query = searchQuery.trim().toLowerCase();
  const matchesSearch = !query ||
    place.name.toLowerCase().includes(query) ||
    place.address.toLowerCase().includes(query);
  return matchesCategory && matchesSearch;
});