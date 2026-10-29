import './PetCard.css';

// Icono QR vectorial blanco para la esquina inferior izquierda
function IconQR() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
      <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm-2 12h8v8H2v-8zm2 2v4h4v-4H4zm12-16h8v8h-8V2zm2 2v4h4V4h-4zm0 10h2v2h-2v-2zm-2 2h2v4h-2v-4zm4 0h2v4h-2v-4zm0-4h4v2h-4v-2zm-2 4v2h-2v-2h2z" />
    </svg>
  );
}

// Icono Lápiz vectorial blanco
function IconEdit() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 3a2.828 2.828 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
    </svg>
  );
}

// Silueta suave de la huella de perro de fondo
// Huella vectorizada idéntica a Figma: rotada ~24°, dedos redondeados y almohadilla central
function PawPrintBackground() {
  return (
    <svg className="pet-card__paw-bg" viewBox="0 0 320 300" fill="none" aria-hidden="true">
      <g transform="rotate(22 170 140)">
        {/* Dedo 1 (izquierdo) */}
        <ellipse cx="65" cy="78" rx="28" ry="38" transform="rotate(-15 65 78)" fill="rgba(255, 255, 255, 0.32)" />
        {/* Dedo 2 (central izquierdo) */}
        <ellipse cx="128" cy="48" rx="29" ry="42" transform="rotate(-3 128 48)" fill="rgba(255, 255, 255, 0.32)" />
        {/* Dedo 3 (central derecho) */}
        <ellipse cx="196" cy="56" rx="29" ry="42" transform="rotate(12 196 56)" fill="rgba(255, 255, 255, 0.32)" />
        {/* Dedo 4 (derecho) */}
        <ellipse cx="254" cy="95" rx="27" ry="38" transform="rotate(26 254 95)" fill="rgba(255, 255, 255, 0.32)" />
        
        {/* Almohadilla central acolchada */}
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
  breed = 'Perro',
  age = 'Perro',
  photo,
  variant = 'detailed',
  onClick,
  onEdit,
  onQrClick,
}) {
  return (
    <article
      className={`pet-card pet-card--${variant}`}
      onClick={onClick}
    >
      {/* Huella decorativa SVG de fondo */}
      <PawPrintBackground />

      {/* Botón superior derecho de Editar */}
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

      {/* Información textual de la mascota */}
      <div className="pet-card__info-group">
        <div className="pet-card__field">
          <span className="pet-card__field-title">Nombre</span>
          <span className="pet-card__field-value">{name}</span>
        </div>

        <div className="pet-card__field">
          <span className="pet-card__field-title">Raza</span>
          <span className="pet-card__field-value">{breed || species}</span>
        </div>

        <div className="pet-card__field">
          <span className="pet-card__field-title">Edad</span>
          <span className="pet-card__field-value">{age}</span>
        </div>
      </div>

      {/* Icono QR inferior izquierdo */}
      <button
        type="button"
        className="pet-card__btn-qr"
        onClick={(e) => {
          e.stopPropagation();
          onQrClick?.();
        }}
        aria-label="Ver código QR de la mascota"
      >
        <IconQR />
      </button>

      {/* Foto circular recortada de la mascota */}
      <div className="pet-card__photo-container">
        {photo ? (
          <img
            src={photo}
            alt={`Foto de ${name}`}
            className="pet-card__photo-img"
          />
        ) : (
          <div className="pet-card__photo-fallback" />
        )}
      </div>
    </article>
  );
}

export default PetCard;