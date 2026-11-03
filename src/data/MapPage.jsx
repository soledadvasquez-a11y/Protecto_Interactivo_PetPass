import { useState, useEffect } from 'react';
import places from '../data/places.js';

function MapPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedPlaceId, setSelectedPlaceId] = useState(null);

  // Filtrado por categoría y búsqueda insensible a mayúsculas/minúsculas
  const filteredPlaces = places.filter((place) => {
    const matchesCategory = activeCategory === 'all' || place.category === activeCategory;
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !query ||
      place.name.toLowerCase().includes(query) ||
      place.address.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  // Limpiar selección si el lugar seleccionado desaparece del filtro actual
  useEffect(() => {
    if (selectedPlaceId !== null) {
      const exists = filteredPlaces.some((p) => p.id === selectedPlaceId);
      if (!exists) {
        setSelectedPlaceId(null);
      }
    }
  }, [searchQuery, activeCategory, filteredPlaces, selectedPlaceId]);

  // ... (JSX del componente)
}