import './MapMarker.css';

const markerConfig = {
  veterinary: {
    label: 'Veterinaria',
    icon: '✚',
  },

  petFriendly: {
    label: 'Pet Friendly',
    icon: '🐾',
  },
};

function MapMarker({
  type = 'veterinary',
  selected = false,
  label,
  onClick,
}) {
  const config =
    markerConfig[type] || markerConfig.veterinary;

  const accessibleLabel =
    label || config.label;

  return (
    <button
      type="button"
      className={`map-marker map-marker--${type} ${
        selected ? 'map-marker--selected' : ''
      }`}
      onClick={onClick}
      aria-label={accessibleLabel}
      aria-pressed={selected}
    >
      <span
        className="map-marker__pin"
        aria-hidden="true"
      >
        <span className="map-marker__icon">
          {config.icon}
        </span>
      </span>

      {selected && (
        <span className="map-marker__label">
          {accessibleLabel}
        </span>
      )}
    </button>
  );
}

export default MapMarker;