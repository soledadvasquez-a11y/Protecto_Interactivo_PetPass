import './PetSelector.css';

function PetSelector({
  name,
  photo,
  variant = 'default',
  onClick,
}) {
  const isAdd = variant === 'add';

  return (
    <button
      type="button"
      className={`pet-selector pet-selector--${variant}`}
      onClick={onClick}
    >
      <span className="pet-selector__circle">
        {isAdd ? (
          <span className="pet-selector__plus">+</span>
        ) : (
          photo && (
            <img
              className="pet-selector__photo"
              src={photo}
              alt={name}
            />
          )
        )}
      </span>

      <span className="pet-selector__name">
        {isAdd ? 'Agregar' : name}
      </span>
    </button>
  );
}

export default PetSelector;
