import { useEffect } from 'react';
import './SideMenu.css';

const figmaMenuOptions = [
  { id: 'account', label: 'Mi Cuenta / Tutor:', icon: '👤', path: '/cuenta' },
  { id: 'pets', label: 'Mis Mascotas', icon: '🐾', path: '/mascotas' },
  { id: 'medical', label: 'Historial Médico', icon: '🩺', path: '/mascotas' },
  { id: 'favorites', label: 'Favoritos', icon: '★', path: '/home' },
  { id: 'alerts', label: 'Reportes y Alertas', icon: '🚨', path: '/alertas' },
  { id: 'help', label: 'Acerca de / Ayuda', icon: 'ℹ', path: '/home' },
];

function SideMenu({
  isOpen = false,
  options = [],
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

  // Usa las opciones oficiales de Figma
  const menuList = options && options.length >= 6 ? options : figmaMenuOptions;

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
        onClick={(e) => e.stopPropagation()}
      >
        <nav className="side-menu__navigation" aria-label="Opciones del menú">
          {menuList.map((item) => (
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