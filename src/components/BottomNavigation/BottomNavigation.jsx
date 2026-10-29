import './BottomNavigation.css';

// 1. QR geométrico limpio y nítido (4 cuadrantes idénticos)
function IconQR() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 3h7v7H3V3zm2 2v3h3V5H5zm9-2h7v7h-7V3zm2 2v3h3V5h-3zM3 14h7v7H3v-7zm2 2v3h3v-3H5zm9 0h2v2h-2v-2zm3 0h4v2h-4v-2zm-3 3h2v2h-2v-2zm3 0h4v2h-4v-2z" />
    </svg>
  );
}

// 2. Home simétrico (techo recto y centrado)
function IconHome() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 3L2 12h3v8h14v-8h3L12 3zm1 15h-2v-5h2v5z" />
    </svg>
  );
}

// 3. Mapa con pin
function IconMap() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19l-6 2.5V5.5L9 3m0 16l6 2.5m-6-18.5l6 2.5m0 16l6-2.5V3l-6 2.5m0 16V5.5" />
      <circle cx="15" cy="8.5" r="2" fill="currentColor" stroke="none" />
    </svg>
  );
}

// 4. Ajustes / Engranaje
function IconSettings() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 8a4 4 0 100 8 4 4 0 000-8zm8.6 2.8l-1.6-.3c-.1-.5-.3-.9-.6-1.3l.9-1.3a1 1 0 00-.2-1.3l-1.9-1.9a1 1 0 00-1.3-.2l-1.3.9c-.4-.3-.9-.5-1.3-.6l-.3-1.6A1 1 0 0013.4 2h-2.8a1 1 0 00-1 .8l-.3 1.6c-.5.1-.9.3-1.3.6l-1.3-.9a1 1 0 00-1.3.2L3.5 6.2a1 1 0 00-.2 1.3l.9 1.3c-.3.4-.5.9-.6 1.3l-1.6.3a1 1 0 00-.8 1v2.8a1 1 0 00.8 1l1.6.3c.1.5.3.9.6 1.3l-.9 1.3a1 1 0 00.2 1.3l1.9 1.9a1 1 0 001.3.2l1.3-.9c.4.3.9.5 1.3.6l.3 1.6a1 1 0 001 .8h2.8a1 1 0 001-.8l.3-1.6c.5-.1.9-.3 1.3-.6l1.3.9a1 1 0 001.3-.2l1.9-1.9a1 1 0 00.2-1.3l-.9-1.3c.3-.4.5-.9.6-1.3l1.6-.3a1 1 0 00.8-1v-2.8a1 1 0 00-.8-1z" />
    </svg>
  );
}

const navItems = [
  { id: 'qr', label: 'QR', icon: <IconQR /> },
  { id: 'home', label: 'Home', icon: <IconHome /> },
  { id: 'map', label: 'Mapa', icon: <IconMap /> },
  { id: 'settings', label: 'Ajustes', icon: <IconSettings /> },
];

function BottomNavigation({ activeSection = 'home', onChange }) {
  return (
    <nav className="bottom-navigation" aria-label="Navegación principal">
      <div className="bottom-navigation__container">
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
              <span className="bottom-navigation__icon">{item.icon}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export default BottomNavigation;