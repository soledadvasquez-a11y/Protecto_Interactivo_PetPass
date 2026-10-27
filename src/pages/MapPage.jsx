import { useState } from 'react';
import SearchBar from '../components/SearchBar/SearchBar.jsx';
import FilterTab from '../components/FilterTab/FilterTab.jsx';
import MapMarker from '../components/MapMarker/MapMarker.jsx';
import PlaceCard from '../components/PlaceCard/PlaceCard.jsx';

import mapBackground from '../assets/map-background.svg';
import placeSnoopy from '../assets/place-snoopy.svg';
import placeSanJorge from '../assets/place-sanjorge.svg';
import placeApolo from '../assets/place-apolo.svg';
import placePaladrar from '../assets/place-paladrar.svg';

import './MapPage.css';

const CATEGORIES = [
  { id: 'all', label: 'Todos' },
  { id: 'parques', label: 'Parques' },
  { id: 'veterinarias', label: 'Veterinarias' },
  { id: 'guarderias', label: 'Guarderías' },
];

const PLACES = [
  {
    id: 1,
    category: 'parques',
    type: 'petFriendly',
    name: 'Parque Snoopy',
    badgeText: 'Normativa Pet-Friendly',
    badgeType: 'park',
    schedule: 'Lunes a Domingo: 07:00 – 19:00',
    address: 'Av. Julio César Valdez, esq. Pacajes',
    description:
      'Área verde cercada con zonas de agilidad, bebederos caninos y dispensadores de bolsas biodegradables. Entrada libre con correa obligatoria.',
    photo: placeSnoopy,
    position: { top: '38%', left: '32%' },
  },
  {
    id: 2,
    category: 'veterinarias',
    type: 'veterinary',
    name: 'Veterinaria San Jorge',
    badgeText: 'Normativa Pet-Friendly',
    badgeType: 'vet',
    schedule: 'Lunes a Domingo: 24 horas',
    address: 'Av. Tiahuanacu, esq. Pacajes',
    description:
      'Clínica veterinaria integral con servicio de urgencias, laboratorio clínico, rayos X y farmacia especializada. Atención profesional para caninos y felinos.',
    photo: placeSanJorge,
    position: { top: '28%', left: '68%' },
  },
  {
    id: 3,
    category: 'veterinarias',
    type: 'veterinary',
    name: 'Veterinaria Apolo',
    badgeText: 'Normativa Pet-Friendly',
    badgeType: 'vet',
    schedule: 'Lunes a Sábado: 08:30 – 19:30',
    address: 'Av. Julio César Valdez, Plaza El Minero',
    description:
      'Centro de salud animal especializado en medicina preventiva, planes de vacunación, desparasitación, peluquería canina y cirugías menores programadas.',
    photo: placeApolo,
    position: { top: '48%', left: '24%' },
  },
  {
    id: 4,
    category: 'cafeteria',
    type: 'petFriendly',
    name: 'Paladrar (Ver más)',
    badgeText: 'Normativa Pet-Friendly',
    badgeType: 'cafe',
    schedule: 'Martes a Domingo: 08:30 – 21:00',
    address: 'Av. Julio César Valdez, próx. Plaza Pacajes',
    description:
      'Café de especialidad y repostería artesanal con terraza al aire libre adaptada para mascotas. Ofrece bebederos limpios, galletas caninas de cortesía y espacio cómodo para compartir con tu peludo.',
    photo: placePaladrar,
    position: { top: '44%', left: '60%' },
  },
];

function MapPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedPlaceId, setSelectedPlaceId] = useState(1);

  // Filtrado reactivo por texto y categoría
  const filteredPlaces = PLACES.filter((place) => {
    const matchesSearch =
      place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.address.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      activeCategory === 'all' || place.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  const selectedPlace = PLACES.find((place) => place.id === selectedPlaceId);

  return (
    <div className="map-page">
      {/* Controles flotantes superiores */}
      <header className="map-page__controls">
        <SearchBar
          value={searchQuery}
          placeholder="Buscar..."
          onChange={(e) => setSearchQuery(e.target.value)}
          onClear={() => setSearchQuery('')}
        />

        <div className="map-page__categories" role="tablist">
          {CATEGORIES.map((cat) => (
            <FilterTab
              key={cat.id}
              label={cat.label}
              active={activeCategory === cat.id}
              onClick={() => setActiveCategory(cat.id)}
            />
          ))}
        </div>
      </header>

      {/* Contenedor del mapa y marcadores interactivos */}
      <main className="map-page__canvas">
        <img
          src={mapBackground}
          alt="Mapa de Villa Dolores"
          className="map-page__map-img"
        />

        {filteredPlaces.map((place) => {
          const isSelected = place.id === selectedPlaceId;

          return (
            <div
              key={place.id}
              className={`map-page__marker-spot ${
                isSelected ? 'map-page__marker-spot--selected' : ''
              }`}
              style={{
                top: place.position.top,
                left: place.position.left,
              }}
            >
              {/* Miniatura previa sobre el pin si está seleccionado */}
              {isSelected && place.photo && (
                <div className="map-page__bubble-preview">
                  <img src={place.photo} alt={place.name} />
                </div>
              )}

              <MapMarker
                type={place.type}
                label={place.name}
                selected={isSelected}
                onClick={() => setSelectedPlaceId(place.id)}
              />
            </div>
          );
        })}
      </main>

      {/* Tarjeta inferior con el componente PlaceCard oficial */}
      {selectedPlace && (
        <section
          className={`map-page__card-container map-page__card-container--${selectedPlace.badgeType}`}
        >
          <div className="map-page__badge">
            ✓ {selectedPlace.badgeText}
          </div>

          <PlaceCard
            type={selectedPlace.type}
            name={selectedPlace.name}
            address={selectedPlace.address}
            description={selectedPlace.description}
            schedule={selectedPlace.schedule}
          />
        </section>
      )}
    </div>
  );
}

export default MapPage;