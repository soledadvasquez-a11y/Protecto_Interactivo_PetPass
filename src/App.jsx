import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import MainLayout from './layouts/MainLayout.jsx';

import OnboardingPage from './pages/OnboardingPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx';
import RegisterTutorPage from './pages/RegisterTutorPage.jsx';
import RegisterPetPage from './pages/RegisterPetPage.jsx';

import HomePage from './pages/HomePage.jsx';
import AccountPage from './pages/AccountPage.jsx';
import PetsPage from './pages/PetsPage.jsx';
import DigitalCardPage from './pages/DigitalCardPage.jsx';
import MedicalHistoryPage from './pages/MedicalHistoryPage.jsx';
import AlertsPage from './pages/AlertsPage.jsx';
import MapPage from './pages/MapPage.jsx';

import PublicPetProfilePage from './pages/PublicPetProfilePage.jsx';

function App() {
  return (
    <Routes>
      {/* Páginas públicas */}

      <Route
        path="/"
        element={<OnboardingPage />}
      />

      <Route
        path="/login"
        element={<LoginPage />}
      />

      <Route
        path="/recuperar-contrasena"
        element={<ForgotPasswordPage />}
      />

      <Route
        path="/registro-tutor"
        element={<RegisterTutorPage />}
      />

      <Route
        path="/mascotas/nueva"
        element={<RegisterPetPage />}
      />

      <Route
        path="/mascotas/publico"
        element={<PublicPetProfilePage />}
      />

      {/* Páginas internas */}

      <Route element={<MainLayout />}>
        <Route
          path="/home"
          element={<HomePage />}
        />

        <Route
          path="/cuenta"
          element={<AccountPage />}
        />

        <Route
          path="/mascotas"
          element={<PetsPage />}
        />

        <Route
          path="/mascotas/:id/carnet"
          element={<DigitalCardPage />}
        />

        <Route
          path="/mascotas/:id/historial-medico"
          element={<MedicalHistoryPage />}
        />

        <Route
          path="/alertas"
          element={<AlertsPage />}
        />

        <Route
          path="/mapa"
          element={<MapPage />}
        />
      </Route>

      {/* URL inexistente */}

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
}

export default App;