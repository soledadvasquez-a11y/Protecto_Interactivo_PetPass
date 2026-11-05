import { useEffect } from 'react';

import './SideMenu.css';

/* =========================================
   ICONOS
========================================= */

function IconHome() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 3 2.5 11h2.2v10h5.2v-6h4.2v6h5.2V11h2.2L12 3z" />
    </svg>
  );
}

function IconUser() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 2a5 5 0 100 10 5 5 0 000-10zm0 12c-5 0-9 2.5-9 6v2h18v-2c0-3.5-4-6-9-6z" />
    </svg>
  );
}

function IconPaw() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <ellipse
        cx="4.5"
        cy="10"
        rx="2"
        ry="3"
      />

      <ellipse
        cx="9"
        cy="5.5"
        rx="2"
        ry="3"
      />

      <ellipse
        cx="15"
        cy="5.5"
        rx="2"
        ry="3"
      />

      <ellipse
        cx="19.5"
        cy="10"
        rx="2"
        ry="3"
      />

      <path d="M12 11.5c-3.2 0-5.5 2-5.5 5 0 2.2 2.3 4.5 5.5 4.5s5.5-2.3 5.5-4.5c0-3-2.3-5-5.5-5z" />
    </svg>
  );
}

function IconAlert() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 3a6 6 0 00-6 6v4H4v2h16v-2h-2V9a6 6 0 00-6-6zm-2 15h4a2 2 0 01-4 0z" />
    </svg>
  );
}

function IconMap() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="1 6 8 3 16 6 23 3 23 18 16 21 8 18 1 21 1 6" />

      <line
        x1="8"
        y1="3"
        x2="8"
        y2="18"
      />

      <line
        x1="16"
        y1="6"
        x2="16"
        y2="21"
      />
    </svg>
  );
}

const ICONS = {
  home: <IconHome />,
  account: <IconUser />,
  pets: <IconPaw />,
  alerts: <IconAlert />,
  map: <IconMap />,
};

/* =========================================
   COMPONENTE
========================================= */

function SideMenu({
  options = [],
  currentPath = '',
  onClose,
  onSelect,
}) {
  /*
    Como SideMenu solo se monta cuando
    menuOpen es true, este efecto existe
    únicamente mientras el menú está abierto.
  */
  useEffect(() => {
    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      'hidden';

    const handleKeyDown = (
      event
    ) => {
      if (event.key === 'Escape') {
        onClose?.();
      }
    };

    window.addEventListener(
      'keydown',
      handleKeyDown
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        'keydown',
        handleKeyDown
      );
    };
  }, [onClose]);

  const handleOptionClick = (
    option
  ) => {
    onSelect?.(option);
    onClose?.();
  };

  const handleLogout = () => {
    onSelect?.({
      id: 'logout',
      label: 'Cerrar sesión',
      path: '/login',
    });

    onClose?.();
  };

  const isOptionActive = (
    option
  ) => {
    /*
      Mascotas tiene varias rutas hijas:
      /mascotas
      /mascotas/:id/carnet
      /mascotas/:id/historial-medico
    */
    if (option.id === 'pets') {
      return currentPath.startsWith(
        '/mascotas'
      );
    }

    return (
      currentPath === option.path
    );
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
        onClick={(event) =>
          event.stopPropagation()
        }
      >

        {/* CABECERA */}

        <header className="side-menu__header">

          <div>
            <span className="side-menu__eyebrow">
              PetPass
            </span>

            <h2 className="side-menu__title">
              Menú
            </h2>
          </div>

          <button
            type="button"
            className="side-menu__close"
            onClick={onClose}
            aria-label="Cerrar menú"
          >
            ✕
          </button>

        </header>

        {/* NAVEGACIÓN */}

        <nav
          className="side-menu__navigation"
          aria-label="Opciones del menú"
        >

          {options.map((item) => {
            const active =
              isOptionActive(item);

            return (
              <button
                key={item.id}
                type="button"
                className={`
                  side-menu__option
                  ${
                    active
                      ? 'side-menu__option--active'
                      : ''
                  }
                `}
                onClick={() =>
                  handleOptionClick(
                    item
                  )
                }
                aria-current={
                  active
                    ? 'page'
                    : undefined
                }
              >

                <span
                  className="side-menu__option-icon"
                  aria-hidden="true"
                >
                  {ICONS[item.id]}
                </span>

                <span className="side-menu__option-label">
                  {item.label}
                </span>

              </button>
            );
          })}

        </nav>

        {/* LOGOUT */}

        <footer className="side-menu__footer">

          <button
            type="button"
            className="side-menu__logout"
            onClick={handleLogout}
          >
            <span aria-hidden="true">
              ↪
            </span>

            Cerrar sesión
          </button>

        </footer>

      </aside>

    </div>
  );
}

export default SideMenu;