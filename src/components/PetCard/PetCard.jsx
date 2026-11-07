import './PetCard.css';

function PetCard({
  variant = 'detailed',
  name,
  photo,
  species,
  breed,
  age,
  weight,
  onEdit,
  onQrClick
}) {
  if (variant === 'compact') {
    return (
      <div className="pet-card pet-card--compact">
        <div className="pet-card__photo-container">
          {photo ? (
            <img src={photo} alt={name} className="pet-card__photo-img" />
          ) : (
            <div className="pet-card__photo-fallback" />
          )}
        </div>
        <div className="pet-card__info-group">
          <span className="pet-card__field-title">{name}</span>
          <span className="pet-card__field-value">
            {species} {breed ? `· ${breed}` : ''}
          </span>
        </div>
        {weight && <div className="pet-card__weight-badge">{weight}</div>}
      </div>
    );
  }

  // Variante Detailed (Tarjeta azul de información)
  return (
    <div className="pet-card pet-card--detailed">
      {/* Fondo vectorial de huella */}
      <svg
        className="pet-card__paw-bg"
        viewBox="0 0 200 200"
        fill="rgba(255, 255, 255, 0.18)"
      >
        <circle cx="50" cy="50" r="25" />
        <circle cx="100" cy="30" r="25" />
        <circle cx="150" cy="50" r="25" />
        <circle cx="170" cy="100" r="20" />
        <path d="M 50 120 C 40 90, 160 90, 150 120 C 140 150, 60 150, 50 120 Z" />
      </svg>

      {/* Botón del Lápiz (Ahora funcional mediante onEdit) */}
      <button
        type="button"
        className="pet-card__btn-edit"
        onClick={onEdit}
        aria-label="Editar mascota"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
      </button>

      {/* Bloque vertical con Nombre, Raza y Edad */}
      <div className="pet-card__info-group">
        <div className="pet-card__field">
          <span className="pet-card__field-label">Nombre</span>
          <span className="pet-card__field-val">{name}</span>
        </div>
        <div className="pet-card__field">
          <span className="pet-card__field-label">Raza</span>
          <span className="pet-card__field-val">{breed || species}</span>
        </div>
        <div className="pet-card__field">
          <span className="pet-card__field-label">Edad</span>
          <span className="pet-card__field-val">{age}</span>
        </div>
      </div>

      {/* Ícono de QR inferior */}
      <button
        type="button"
        className="pet-card__btn-qr"
        onClick={onQrClick}
        aria-label="Ver QR"
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
      </button>

      {/* Foto circular recortada */}
      <div className="pet-card__photo-container">
        {photo ? (
          <img src={photo} alt={name} className="pet-card__photo-img" />
        ) : (
          <div className="pet-card__photo-fallback" />
        )}
      </div>
    </div>
  );
}

export default PetCard;