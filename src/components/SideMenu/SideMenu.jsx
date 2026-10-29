import { useEffect } from 'react';
import './SideMenu.css';

// Componentes SVG nativos vectoriales con estilo Figma (color #f7d79a)
function IconUser() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2a5 5 0 100 10 5 5 0 000-10zm0 12c-5 0-9 2.5-9 6v2h18v-2c0-3.5-4-6-9-6z" />
    </svg>
  );
}

function IconPaw() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
      <ellipse cx="4.5" cy="10" rx="2" ry="3" />
      <ellipse cx="9" cy="5.5" rx="2" ry="3" />
      <ellipse cx="15" cy="5.5" rx="2" ry="3" />
      <ellipse cx="19.5" cy="10" rx="2" ry="3" />
      <path d="M12 11.5c-3.2 0-5.5 2-5.5 5 0 2.2 2.3 4.5 5.5 4.5s5.5-2.3 5.5-4.5c0-3-2.3-5-5.5-5z" />
    </svg>
  );
}

function IconMedicalStethoscope() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 3v6a5.5 5.5 0 0011 0V3" />
      <circle cx="4.5" cy="3" r="1.5" fill="currentColor" />
      <circle cx="15.5" cy="3" r="1.5" fill="currentColor" />
      <path d="M10 14.5v3.5a3 3 0 003 3h3a2.5 2.5 0 002.5-2.5v-1" />
      <circle cx="18.5" cy="16.5" r="2" fill="currentColor" />
    </svg>
  );
}

function IconStar() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function IconSirenAlert() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 4a6 6 0 00-6 6v3h12v-3a6 6 0 00-6-6zm-8 15h16a1 1 0 010 2H4a1 1 0 010-2zm1-3h14v1.5H5V16zM11 1h2v2h-2V1zM4.2 4.2l1.4 1.4-1.4 1.4-1.4-1.4 1.4-1.4zm14.2 0l1.4 1.4-1.4 1.4-1.4-1.4 1.4-1.4z" />
    </svg>
  );
}

function IconInfo() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
    </svg>
  );
}

const figmaMenuOptions = [
  { id: 'account', label: 'Mi Cuenta / Tutor:', icon: <IconUser />, path: '/cuenta' },
  { id: 'pets', label: 'Mis Mascotas', icon: <IconPaw />, path: '/mascotas' },
  { id: 'medical', label: 'Historial Médico', icon: <IconMedicalStethoscope />, path: '/historial' },
  { id: 'favorites', label: 'Favoritos', icon: <IconStar />, path: '/favoritos' },
  { id: 'alerts', label: 'Reportes y Alertas', icon: <IconSirenAlert />, path: '/alertas' },
  { id: 'help', label: 'Acerca de / Ayuda', icon: <IconInfo />, path: '/ayuda' },
];

function SideMenu({
  isOpen = false,
  onClose,
  onSelect,
}) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOptionClick = (option) => {
    onSelect?.(option);
    onClose?.();
  };

  const handleLogout = () => {
    onSelect?.({ id: 'logout', path: '/login', danger: true });
    onClose?.();
  };

  return (
    <div className="side-menu__overlay" onClick={onClose}>
      <aside
        className="side-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menú principal"
        onClick={(event) => event.stopPropagation()}
      >
        <nav className="side-menu__navigation" aria-label="Opciones del menú">
          {figmaMenuOptions.map((item) => (
            <button
              key={item.id}
              type="button"
              className="side-menu__option"
              onClick={() => handleOptionClick(item)}
            >
              <span className="side-menu__option-icon" aria-hidden="true">
                {item.icon}
              </span>
              <span className="side-menu__option-label">{item.label}</span>
            </button>
          ))}
        </nav>

        <button
          type="button"
          className="side-menu__logout"
          onClick={handleLogout}
        >
          Cerrar Sesión
        </button>
      </aside>
    </div>
  );
}

export default SideMenu;