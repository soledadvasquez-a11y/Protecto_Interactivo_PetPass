import './MedicalRecordCard.css';

const recordConfig = {
  vaccine: {
    label: 'Vacuna',
    icon: '💉',
  },

  deworming: {
    label: 'Desparasitación',
    icon: '✚',
  },

  consultation: {
    label: 'Consulta',
    icon: '🩺',
  },
};

function MedicalRecordCard({
  type = 'consultation',
  title,
  date,
  place,
  description,
  onClick,
}) {
  const config =
    recordConfig[type] || recordConfig.consultation;

  return (
    <article
      className={`medical-record-card medical-record-card--${type}`}
      onClick={onClick}
    >
      <div className="medical-record-card__icon">
        <span aria-hidden="true">
          {config.icon}
        </span>
      </div>

      <div className="medical-record-card__content">
        <span className="medical-record-card__type">
          {config.label}
        </span>

        <h3 className="medical-record-card__title">
          {title}
        </h3>

        <div className="medical-record-card__meta">
          {date && (
            <span>
              {date}
            </span>
          )}

          {place && (
            <span>
              {place}
            </span>
          )}
        </div>

        {description && (
          <p className="medical-record-card__description">
            {description}
          </p>
        )}
      </div>
    </article>
  );
}

export default MedicalRecordCard;