import { useEffect } from 'react';
import './SideMenu.css';

function SideMenu({
  isOpen = false,
  userName = 'Usuario',
  options = [],
  onClose,
  onSelect,
}) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const handleOptionClick = (option) => {
    onSelect?.(option);
    onClose?.();
  };

  return (
    <div
      className="side-menu__overlay"
      onClick={onClose}
    >
      <aside
        className="side-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menú principal"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="side-menu__header">
          <div>
            <p className="side-menu__greeting">
              Hola
            </p>

            <h2 className="side-menu__user">
              {userName}
            </h2>
          </div>

          <button
            type="button"
            className="side-menu__close"
            onClick={onClose}
            aria-label="Cerrar menú"
          >
            ×
          </button>
        </div>

        <nav
          className="side-menu__navigation"
          aria-label="Opciones del menú"
        >
          {options.map((option) => (
            <button
              key={option.id}
              type="button"
              className={`side-menu__option ${
                option.danger
                  ? 'side-menu__option--danger'
                  : ''
              }`}
              onClick={() => handleOptionClick(option)}
            >
              {option.icon && (
                <span
                  className="side-menu__option-icon"
                  aria-hidden="true"
                >
                  {option.icon}
                </span>
              )}

              <span>{option.label}</span>
            </button>
          ))}
        </nav>
      </aside>
    </div>
  );
}

export default SideMenu;