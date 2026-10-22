import { useState } from 'react';
import {
  Outlet,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import Header from '../components/Header/Header.jsx';
import SideMenu from '../components/SideMenu/SideMenu.jsx';
import BottomNavigation from '../components/BottomNavigation/BottomNavigation.jsx';

import './MainLayout.css';

function MainLayout() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const menuOptions = [
    {
      id: 'account',
      label: 'Mi cuenta',
      icon: '👤',
      path: '/cuenta',
    },
    {
      id: 'pets',
      label: 'Mis mascotas',
      icon: '🐾',
      path: '/mascotas',
    },
    {
      id: 'alerts',
      label: 'Alertas',
      icon: '!',
      path: '/alertas',
    },
    {
      id: 'logout',
      label: 'Cerrar sesión',
      icon: '↪',
      danger: true,
      path: '/login',
    },
  ];

  const handleMenuSelect = (option) => {
    if (option.path) {
      navigate(option.path);
    }
  };

  const getActiveSection = () => {
    if (location.pathname === '/home') {
      return 'home';
    }

    if (location.pathname === '/mapa') {
      return 'map';
    }

    if (location.pathname === '/cuenta') {
      return 'settings';
    }

    if (
      location.pathname.startsWith('/mascotas')
    ) {
      return 'qr';
    }

    return 'home';
  };

  const handleBottomNavigation = (section) => {
    const routes = {
      home: '/home',
      qr: '/mascotas',
      map: '/mapa',
      settings: '/cuenta',
    };

    const targetRoute = routes[section];

    if (targetRoute) {
      navigate(targetRoute);
    }
  };

  return (
    <div className="main-layout">
      <Header
        onMenuClick={() => setMenuOpen(true)}
      />

      <SideMenu
        isOpen={menuOpen}
        userName="Usuario"
        options={menuOptions}
        onClose={() => setMenuOpen(false)}
        onSelect={handleMenuSelect}
      />

      <div className="main-layout__content">
        <Outlet />
      </div>

      <BottomNavigation
        activeSection={getActiveSection()}
        onChange={handleBottomNavigation}
      />
    </div>
  );
}

export default MainLayout;