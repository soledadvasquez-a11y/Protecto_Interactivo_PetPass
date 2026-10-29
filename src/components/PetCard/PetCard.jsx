import './PetCard.css';

function IconQR() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
      <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm-2 12h8v8H2v-8zm2 2v4h4v-4H4zm12-16h8v8h-8V2zm2 2v4h4V4h-4zm0 10h2v2h-2v-2zm-2 2h2v4h-2v-4zm4 0h2v4h-2v-4zm0-4h4v2h-4v-2zm-2 4v2h-2v-2h2z" />
    </svg>
  );
}

function IconEdit() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 3a2.828 2.828 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
    </svg>
  );
}

function PawPrintBackground() {
  return (
    <svg className="pet-card__paw-bg" viewBox="0 0 320 300" fill="none" aria-hidden="true">
      <g transform="rotate(22 170 140)">
        <ellipse cx="65" cy="78" rx="28" ry="38" transform="rotate(-15 65 78)" fill="rgba(255, 255, 255, 0.32)" />
        <ellipse cx="128" cy="48" rx="29" ry="42" transform="rotate(-3 128 48)" fill="rgba(255, 255, 255, 0.32)" />
        <ellipse cx="196" cy="56" rx="29" ry="42" transform="rotate(12 196 56)" fill="rgba(255, 255, 255, 0.32)" />
        <ellipse cx="254" cy="95" rx="27" ry="38" transform="rotate(26 254 95)" fill="rgba(255, 255, 255, 0.32)" />
        <path
          d="M95 130 C65 140 55 175 80 208 C105 238 160 248 190 220 C225 190 210 142 180 130 C155 120 120 120 95 130 Z"
          fill="rgba(255, 255, 255, 0.28)"
        />
      </g>
    </svg>
  );
}

function PetCard({
  name = 'Nombre',
  species = 'Perro',
  breed = 'Pug',
  age = '5 años',
  weight = '7 kg',
  photo,
  variant = 'detailed', // 'detailed' | 'compact'
  onClick,
  onEdit,
  onQrClick,
}) {
  const isCompact = variant === 'compact';

  return (
    <article
      className={`pet-card ${isCompact ? 'pet-card--compact' : 'pet-card--detailed'}`}
      onClick={onClick}
    >
      {!isCompact && <PawPrintBackground />}

      {!isCompact && (
        <button
          type="button"
          className="pet-card__btn-edit"
          onClick={(e) => {
            e.stopPropagation();
            onEdit?.();
          }}
          aria-label={`Editar información de ${name}`}
        >
          <IconEdit />
        </button>
      )}

      {/* Foto circular */}
      <div className="pet-card__photo-container">
        {photo ? (
          <img src={photo} alt={name} className="pet-card__photo-img" />
        ) : (
          <div className="pet-card__photo-fallback" />
        )}
      </div>

      {/* Contenido textual */}
      <div className="pet-card__info-group">
        <div className="pet-card__field">
          <span className="pet-card__field-title">{name}</span>
          <span className="pet-card__field-value">
            {isCompact ? `${breed} · ${age}` : breed || species}
          </span>
        </div>

        {!isCompact && (
          <div className="pet-card__field">
            <span className="pet-card__field-title">Edad</span>
            <span className="pet-card__field-value">{age}</span>
          </div>
        )}
      </div>

      {isCompact && weight && (
        <div className="pet-card__weight-badge">
          {weight}
        </div>
      )}

      {!isCompact && (
        <button
          type="button"
          className="pet-card__btn-qr"
          onClick={(e) => {
            e.stopPropagation();
            onQrClick?.();
          }}
          aria-label="Ver código QR"
        >
          <IconQR />
        </button>
      )}
    </article>
  );
}

export default PetCard;