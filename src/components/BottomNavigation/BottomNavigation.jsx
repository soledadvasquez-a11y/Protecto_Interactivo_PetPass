import './BottomNavigation.css';

const navItems = [
  { id: 'qr', label: 'QR', icon: '▦' },
  { id: 'home', label: 'Home', icon: '⌂' },
  { id: 'map', label: 'Mapa', icon: '⌖' },
  { id: 'settings', label: 'Ajustes', icon: '⚙' },
];

function BottomNavigation({
  activeSection = 'home',
  onChange,
}) {
  return (
    <nav className="bottom-navigation" aria-label="Navegación principal">
      {navItems.map((item) => {
        const isActive = activeSection === item.id;

        return (
          <button
            key={item.id}
            type="button"
            className={`bottom-navigation__item ${
              isActive ? 'bottom-navigation__item--active' : ''
            }`}
            onClick={() => onChange?.(item.id)}
            aria-label={item.label}
            aria-current={isActive ? 'page' : undefined}
          >
            <span className="bottom-navigation__icon">
              {item.icon}
            </span>

            <span className="bottom-navigation__label">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

export default BottomNavigation;
