import './AlertCard.css';

const alertConfig = {
  lost: {
    label: 'Mascota perdida',
    icon: '🐾',
  },

  adoption: {
    label: 'En adopción',
    icon: '♥',
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
  contact,
  onClick,
}) {
  const config =
    alertConfig[type] ||
    alertConfig.lost;

  return (
    <article
      className={`
        alert-card
        alert-card--${type}
        ${
          !photo
            ? 'alert-card--no-photo'
            : ''
        }
        ${
          onClick
            ? 'alert-card--clickable'
            : ''
        }
      `}
      onClick={onClick}
    >

      {photo ? (
        <img
          className="alert-card__photo"
          src={photo}
          alt={`Foto de ${petName}`}
        />
      ) : (
        <div
          className="alert-card__photo-placeholder"
          aria-hidden="true"
        >
          <span>
            {config.icon}
          </span>
        </div>
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

        {contact && (
          <p className="alert-card__contact">
            <strong>
              Contacto:
            </strong>{' '}
            {contact}
          </p>
        )}

      </div>

    </article>
  );
}

export default AlertCard;