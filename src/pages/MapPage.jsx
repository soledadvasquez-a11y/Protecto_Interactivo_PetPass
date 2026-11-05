import {
  useMemo,
  useState,
} from 'react';

import SearchBar from '../components/SearchBar/SearchBar.jsx';
import FilterTab from '../components/FilterTab/FilterTab.jsx';
import MapMarker from '../components/MapMarker/MapMarker.jsx';
import PlaceCard from '../components/PlaceCard/PlaceCard.jsx';

import places from '../data/places.js';

import mapBackground from '../assets/map-background.svg';

import './MapPage.css';

const CATEGORIES = [
  {
    id: 'all',
    label: 'Todos',
  },
  {
    id: 'park',
    label: 'Parques',
  },
  {
    id: 'veterinary',
    label: 'Veterinarias',
  },
  {
    id: 'petFriendly',
    label: 'Pet Friendly',
  },
];

const PLACE_BADGES = {
  park: 'Parque Pet-Friendly',
  veterinary: 'Atención para mascotas',
  petFriendly: 'Lugar Pet-Friendly',
};

function MapPage() {
  const [searchQuery, setSearchQuery] =
    useState('');

  const [
    activeCategory,
    setActiveCategory,
  ] = useState('all');

  const [
    selectedPlaceId,
    setSelectedPlaceId,
  ] = useState(
    places[0]?.id ?? null
  );

  /*
    Filtra por:
    1. categoría
    2. nombre
    3. dirección
  */
  const filteredPlaces = useMemo(() => {
    const query =
      searchQuery
        .trim()
        .toLowerCase();

    return places.filter((place) => {
      const matchesCategory =
        activeCategory === 'all' ||
        place.category === activeCategory;

      const matchesSearch =
        !query ||
        place.name
          .toLowerCase()
          .includes(query) ||
        place.address
          .toLowerCase()
          .includes(query);

      return (
        matchesCategory &&
        matchesSearch
      );
    });
  }, [
    activeCategory,
    searchQuery,
  ]);


  const selectedPlace =
  filteredPlaces.find(
    (place) =>
      place.id === selectedPlaceId
  ) ?? null;

  const handleCategoryChange = (
    categoryId
  ) => {
    setActiveCategory(categoryId);
  };

  const handlePlaceSelect = (
    placeId
  ) => {
    setSelectedPlaceId(placeId);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="map-page">

      <header className="map-page__controls">

        <SearchBar
          value={searchQuery}
          placeholder="Buscar por nombre o dirección..."
          onChange={(event) =>
            setSearchQuery(
              event.target.value
            )
          }
          onClear={handleClearSearch}
        />

        <div
          className="map-page__categories"
          role="tablist"
          aria-label="Categorías de lugares"
        >
          {CATEGORIES.map(
            (category) => (
              <FilterTab
                key={category.id}
                label={category.label}
                active={
                  activeCategory ===
                  category.id
                }
                onClick={() =>
                  handleCategoryChange(
                    category.id
                  )
                }
              />
            )
          )}
        </div>

      </header>

      <main className="map-page__canvas">

        <img
          src={mapBackground}
          alt="Mapa de lugares para mascotas en La Paz"
          className="map-page__map-img"
        />

        {filteredPlaces.length === 0 && (
          <div className="map-page__empty">

            <span aria-hidden="true">
              📍
            </span>

            <p>
              No se encontraron lugares para
              esta categoría o búsqueda.
            </p>

          </div>
        )}

        {filteredPlaces.map((place) => {
          const isSelected =
            place.id ===
            selectedPlaceId;

          return (
            <div
              key={place.id}
              className={`map-page__marker-spot ${
                isSelected
                  ? 'map-page__marker-spot--selected'
                  : ''
              }`}
              style={{
                top: place.position.top,
                left: place.position.left,
              }}
            >

              {isSelected &&
                place.photo && (
                  <div className="map-page__bubble-preview">

                    <img
                      src={place.photo}
                      alt={place.name}
                    />

                  </div>
                )}

              <MapMarker
                type={place.type}
                label={place.name}
                selected={isSelected}
                onClick={() =>
                  handlePlaceSelect(
                    place.id
                  )
                }
              />

            </div>
          );
        })}

      </main>

      {selectedPlace && (
        <section
          className={`map-page__card-container map-page__card-container--${selectedPlace.type}`}
        >

          <div className="map-page__badge">
            ✓{' '}
            {
              PLACE_BADGES[
                selectedPlace.type
              ]
            }
          </div>

          <PlaceCard
            type={selectedPlace.type}
            name={selectedPlace.name}
            address={selectedPlace.address}
            description={
              selectedPlace.description
            }
            schedule={
              selectedPlace.schedule
            }
          />

        </section>
      )}

    </div>
  );
}

export default MapPage;