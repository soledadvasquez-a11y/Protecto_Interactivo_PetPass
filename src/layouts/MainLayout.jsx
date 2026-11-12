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

/*
  Solo incluimos rutas que realmente
  existen en App.jsx.
*/
const MENU_OPTIONS = [
  {
    id: 'home',
    label: 'Inicio',
    path: '/home',
  },
  {
    id: 'account',
    label: 'Mi cuenta',
    path: '/cuenta',
  },
  {
    id: 'pets',
    label: 'Mis mascotas',
    path: '/mascotas',
  },
  {
    id: 'alerts',
    label: 'Comunidad y alertas',
    path: '/alertas',
  },
  {
    id: 'map',
    label: 'Mapa Pet Friendly',
    path: '/mapa',
  },
];

function MainLayout() {
  const [
    menuOpen,
    setMenuOpen,
  ] = useState(false);

  const navigate =
    useNavigate();

  const location =
    useLocation();

  const handleMenuSelect = (
    option
  ) => {
    if (option.path) {
      navigate(option.path);
    }
  };

  const getActiveSection = () => {
    if (
      location.pathname === '/home'
    ) {
      return 'home';
    }

    if (
      location.pathname === '/mapa'
    ) {
      return 'map';
    }

    if (
      location.pathname === '/cuenta'
    ) {
      return 'settings';
    }

    if (
      location.pathname.startsWith(
        '/mascotas'
      )
    ) {
      return 'qr';
    }

    /*
      Alertas no tiene botón propio
      en BottomNavigation.

      Dejamos home como fallback.
    */
    return 'home';
  };

  const handleBottomNavigation = (
    section
  ) => {
    const routes = {
      home: '/home',
      qr: '/mascotas',
      map: '/mapa',
      settings: '/cuenta',
    };

    const targetRoute =
      routes[section];

    if (targetRoute) {
      navigate(targetRoute);
    }
  };

  return (
    <div className="main-layout">

      <Header
        onMenuClick={() =>
          setMenuOpen(true)
        }
      />

      {/*
        CONDICIONAL REAL DEL M5

        SideMenu solo aparece cuando:
        menuOpen === true
      */}
      {menuOpen && (
        <SideMenu
          options={MENU_OPTIONS}
          currentPath={
            location.pathname
          }
          onClose={() =>
            setMenuOpen(false)
          }
          onSelect={
            handleMenuSelect
          }
        />
      )}

      <div className="main-layout__content">
        <Outlet />
      </div>

      <BottomNavigation
        activeSection={
          getActiveSection()
        }
        onChange={
          handleBottomNavigation
        }
      />

    </div>
  );
}

export default MainLayout;