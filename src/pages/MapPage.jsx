import {
  useEffect,
  useState,
} from 'react';

import SearchBar from '../components/SearchBar/SearchBar.jsx';
import FilterTab from '../components/FilterTab/FilterTab.jsx';
import MapMarker from '../components/MapMarker/MapMarker.jsx';
import PlaceCard from '../components/PlaceCard/PlaceCard.jsx';

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
  const [places, setPlaces] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState('');

  const [searchQuery, setSearchQuery] =
    useState('');

  const [
    activeCategory,
    setActiveCategory,
  ] = useState('all');

  const [
    selectedPlaceId,
    setSelectedPlaceId,
  ] = useState(null);

  useEffect(() => {
    async function loadPlaces() {
      setLoading(true);
      setError('');

      const params = new URLSearchParams();

      if (activeCategory !== 'all') {
        params.set('category', activeCategory);
      }

      if (searchQuery.trim()) {
        params.set('q', searchQuery.trim());
      }

      const queryString = params.toString();
      const url = queryString
        ? `/api/lugares?${queryString}`
        : '/api/lugares';

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
          setPlaces(data);
        } else {
          setError(
            data.error ||
              'No se pudieron cargar los lugares.'
          );
        }
      } catch {
        setError(
          'No se pudo conectar con la API. ¿Está encendida?'
        );
      } finally {
        setLoading(false);
      }
    }

    loadPlaces();
  }, [activeCategory, searchQuery]);

  const selectedPlace =
    places.find(
      (place) =>
        place.id === selectedPlaceId
    ) ??
    places[0] ??
    null;

  const handleCategoryChange = (
    categoryId
  ) => {
    setActiveCategory(categoryId);
    setSelectedPlaceId(null);
  };

  const handlePlaceSelect = (
    placeId
  ) => {
    setSelectedPlaceId(placeId);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSelectedPlaceId(null);
  };

  return (
    <div className="map-page">

      <header className="map-page__controls">

        <SearchBar
          value={searchQuery}
          placeholder="Buscar por nombre o dirección..."
          onChange={(event) => {
            setSearchQuery(
              event.target.value
            );
            setSelectedPlaceId(null);
          }}
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

        {loading && (
          <div className="map-page__empty">
            <p>Cargando lugares…</p>
          </div>
        )}

        {!loading && error && (
          <div className="map-page__empty">
            <span aria-hidden="true">
              ⚠️
            </span>
            <p role="alert">{error}</p>
          </div>
        )}

        {!loading &&
          !error &&
          places.length === 0 && (
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

        {!loading &&
          !error &&
          places.map((place) => {
          const isSelected =
            place.id ===
            selectedPlace?.id;

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

      {!loading &&
        !error &&
        selectedPlace && (
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