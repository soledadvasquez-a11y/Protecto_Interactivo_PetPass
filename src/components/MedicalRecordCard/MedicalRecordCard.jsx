
import { useState } from 'react';

import './MedicalRecordCard.css';

function IconCheck() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function IconClock() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15 15" />
    </svg>
  );
}

function IconStethoscope() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.5 3v6a5.5 5.5 0 0011 0V3" />

      <circle
        cx="4.5"
        cy="3"
        r="1.5"
        fill="currentColor"
      />

      <circle
        cx="15.5"
        cy="3"
        r="1.5"
        fill="currentColor"
      />

      <path d="M10 14.5v3.5a3 3 0 003 3h3a2.5 2.5 0 002.5-2.5v-1" />

      <circle
        cx="18.5"
        cy="16.5"
        r="2"
        fill="currentColor"
      />
    </svg>
  );
}

const variantConfig = {
  vacunas: {
    icon: <IconCheck />,
    badgeClass: 'medical-card__badge--vaccine',
  },

  desparasitacion: {
    icon: <IconClock />,
    badgeClass: 'medical-card__badge--deworming',
  },

  consultas: {
    icon: <IconStethoscope />,
    badgeClass: 'medical-card__badge--consultation',
  },
};

const typeToVariant = {
  vaccine: 'vacunas',
  deworming: 'desparasitacion',
  consultation: 'consultas',
};

function MedicalRecordCard({
  title = 'Title',
  date = 'date',
  nextDate,
  place,
  description,
  type,
  variant,
  onEdit,
  onClick,
}) {
  const [expanded, setExpanded] = useState(false);

  const resolvedVariant =
    variant ||
    typeToVariant[type] ||
    'vacunas';

  const config =
    variantConfig[resolvedVariant] ||
    variantConfig.vacunas;

  // Compatibilidad con el onClick anterior.
  const editAction = onEdit || onClick;

  const hasDetails = Boolean(
    nextDate || place || description
  );

  return (
    <article className="medical-record-card">

      <div className="medical-record-card__top">

        <button
          type="button"
          className="medical-record-card__summary"
          onClick={() =>
            setExpanded((current) => !current)
          }
          aria-expanded={expanded}
          aria-label={`Ver detalles de ${title}`}
        >
          <div
            className={`medical-card__badge ${config.badgeClass}`}
            aria-hidden="true"
          >
            {config.icon}
          </div>

          <div className="medical-card__content">
            <h4 className="medical-card__title">
              {title}
            </h4>

            <span className="medical-card__date">
              {date}
            </span>
          </div>
        </button>

        {editAction && (
          <button
            type="button"
            className="medical-record-card__edit"
            onClick={editAction}
            aria-label={`Editar ${title}`}
            title="Editar registro"
          >
            <svg
              width="21"
              height="21"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
          </button>
        )}

      </div>

      {hasDetails && (
        <button
          type="button"
          className="medical-record-card__details-toggle"
          onClick={() =>
            setExpanded((current) => !current)
          }
          aria-expanded={expanded}
        >
          {expanded
            ? 'Ocultar detalles ▲'
            : 'Ver detalles ▼'}
        </button>
      )}

      {expanded && hasDetails && (
        <div className="medical-record-card__details">

          {nextDate && (
            <p>
              <strong>Próxima fecha: </strong>
              {nextDate}
            </p>
          )}

          {place && (
            <p>
              <strong>Lugar: </strong>
              {place}
            </p>
          )}

          {description && (
            <div className="medical-record-card__description">
              {description}
            </div>
          )}

        </div>
      )}

    </article>
  );
}

export default MedicalRecordCard;
