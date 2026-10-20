import './FilterTab.css';

function FilterTab({
  label,
  active = false,
  onClick,
}) {
  return (
    <button
      type="button"
      className={`filter-tab ${
        active ? 'filter-tab--active' : ''
      }`}
      onClick={onClick}
      aria-pressed={active}
    >
      {label}
    </button>
  );
}

export default FilterTab;
