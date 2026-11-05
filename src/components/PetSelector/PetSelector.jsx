import './PetSelector.css';
import defaultDogIcon from '../../assets/VectorDog.png';

function PlusIcon() {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function PetSelector({
  name = 'Dog',
  photo,
  variant = 'default',
  selected = false,
  onClick,
}) {
  const isAdd = variant === 'add' || (typeof name === 'string' && name.toLowerCase() === 'agregar');

  return (
    <button
      type="button"
      className={`pet-selector ${selected ? 'pet-selector--selected' : ''} ${isAdd ? 'pet-selector--add' : ''}`}
      onClick={onClick}
    >
      <div className="pet-selector__circle">
        {isAdd ? (
          <PlusIcon />
        ) : photo ? (
          <img
            className="pet-selector__photo"
            src={photo}
            alt={name}
          />
        ) : (
          <img
            className="pet-selector__img"
            src={defaultDogIcon}
            alt={name}
          />
        )}
      </div>

      <span className="pet-selector__label">
        {isAdd ? 'Agregar' : name}
      </span>
    </button>
  );
}

export default PetSelector;