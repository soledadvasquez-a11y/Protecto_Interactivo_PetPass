import './AlertCard.css';

const alertConfig = {
  lost: {
    label: 'Mascota perdida',
    icon: '🐾',
  },

  emergency: {
    label: 'Emergencia',
    icon: '!',
  },
};

function AlertCard({
  type = 'lost',
  petName,
  photo,
  location,
  date,
  description,
  onClick,
}) {
  const config =
    alertConfig[type] || alertConfig.lost;

  return (
    <article
      className={`alert-card alert-card--${type}`}
      onClick={onClick}
    >
      {photo && (
        <img
          className="alert-card__photo"
          src={photo}
          alt={`Foto de ${petName}`}
        />
      )}

      <div className="alert-card__content">
        <div className="alert-card__top">
          <span className="alert-card__type">
            <span
              className="alert-card__icon"
              aria-hidden="true"
            >
              {config.icon}
            </span>

            {config.label}
          </span>

          {date && (
            <span className="alert-card__date">
              {date}
            </span>
          )}
        </div>

        <h3 className="alert-card__name">
          {petName}
        </h3>

        {location && (
          <p className="alert-card__location">
            {location}
          </p>
        )}

        {description && (
          <p className="alert-card__description">
            {description}
          </p>
        )}
      </div>
    </article>
  );
}

export default AlertCard;