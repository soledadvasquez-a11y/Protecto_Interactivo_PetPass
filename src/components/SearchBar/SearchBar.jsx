import './SearchBar.css';

function SearchBar({
  value = '',
  placeholder = 'Buscar...',
  onChange,
  onClear,
}) {
  const isFilled = value.trim().length > 0;

  const handleClear = () => {
    onClear?.();
  };

  return (
    <div
      className={`search-bar ${
        isFilled ? 'search-bar--filled' : ''
      }`}
    >
      <span
        className="search-bar__icon"
        aria-hidden="true"
      >
        🔍
      </span>

      <input
        className="search-bar__input"
        type="search"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        aria-label={placeholder}
      />

      {isFilled && (
        <button
          type="button"
          className="search-bar__clear"
          onClick={handleClear}
          aria-label="Limpiar búsqueda"
        >
          ×
        </button>
      )}
    </div>
  );
}

export default SearchBar;