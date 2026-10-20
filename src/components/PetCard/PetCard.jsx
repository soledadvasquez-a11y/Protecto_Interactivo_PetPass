import './PetCard.css';

function PetCard({
  name,
  photo,
  species,
  breed,
  age,
  variant = 'compact',
  onClick,
  onEdit,
  onQrClick,
}) {
  return (
    <article
      className={`pet-card pet-card--${variant}`}
      onClick={onClick}
    >
      <div className="pet-card__content">
        <div className="pet-card__info">
          <h3 className="pet-card__name">{name}</h3>

          {variant === 'detailed' && (
            <>
              <p>
                <strong>Especie:</strong> {species}
              </p>

              <p>
                <strong>Raza:</strong> {breed}
              </p>

              <p>
                <strong>Edad:</strong> {age}
              </p>
            </>
          )}

          {variant === 'compact' && (
            <p className="pet-card__compact-info">
              {breed} · {age}
            </p>
          )}
        </div>

        {photo && (
          <img
            className="pet-card__photo"
            src={photo}
            alt={`Foto de ${name}`}
          />
        )}
      </div>

      {variant === 'detailed' && (
        <div className="pet-card__actions">
          <button
            type="button"
            className="pet-card__action"
            onClick={(event) => {
              event.stopPropagation();
              onQrClick?.();
            }}
          >
            QR
          </button>

          <button
            type="button"
            className="pet-card__action"
            onClick={(event) => {
              event.stopPropagation();
              onEdit?.();
            }}
          >
            Editar
          </button>
        </div>
      )}
    </article>
  );
}

export default PetCard;
