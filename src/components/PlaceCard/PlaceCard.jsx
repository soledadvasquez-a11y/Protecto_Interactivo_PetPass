import './PlaceCard.css';

const placeConfig = {
  veterinary: {
    label: 'Veterinaria',
    icon: '✚',
  },

  petFriendly: {
    label: 'Pet Friendly',
    icon: '🐾',
  },
};

function PlaceCard({
  type = 'veterinary',
  name,
  address,
  description,
  schedule,
  distance,
  onClick,
  onAction,
}) {
  const config =
    placeConfig[type] || placeConfig.veterinary;

  return (
    <article
      className={`place-card place-card--${type}`}
      onClick={onClick}
    >
      <div className="place-card__header">
        <div className="place-card__type">
          <span
            className="place-card__icon"
            aria-hidden="true"
          >
            {config.icon}
          </span>

          <span>
            {config.label}
          </span>
        </div>

        {distance && (
          <span className="place-card__distance">
            {distance}
          </span>
        )}
      </div>

      <h3 className="place-card__name">
        {name}
      </h3>

      {address && (
        <p className="place-card__address">
          {address}
        </p>
      )}

      {description && (
        <p className="place-card__description">
          {description}
        </p>
      )}

      {schedule && (
        <p className="place-card__schedule">
          <strong>Horario:</strong> {schedule}
        </p>
      )}

      {onAction && (
        <button
          type="button"
          className="place-card__action"
          onClick={(event) => {
            event.stopPropagation();
            onAction();
          }}
        >
          Ver lugar
        </button>
      )}
    </article>
  );
}

export default PlaceCard;