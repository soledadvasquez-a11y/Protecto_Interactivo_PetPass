import { useState } from 'react';

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

import initialPets from './data/pets.js';
import initialMedicalRecords from './data/medicalRecords.js';
import initialAlerts from './data/alerts.js';

function App() {
  const [pets, setPets] = useState(initialPets);
  const [medicalRecords, setMedicalRecords] =
    useState(initialMedicalRecords);
  const [alerts, setAlerts] = useState(initialAlerts);

  const addPet = (newPet) => {
    setPets((currentPets) => [
      ...currentPets,
      newPet,
    ]);
  };

  const updatePet = (updatedPet) => {
    setPets((currentPets) =>
      currentPets.map((pet) =>
        pet.id === updatedPet.id
          ? updatedPet
          : pet
      )
    );
  };

  const updatePetStatus = (petId, status) => {
    setPets((currentPets) =>
      currentPets.map((pet) =>
        pet.id === petId
          ? {
              ...pet,
              status,
            }
          : pet
      )
    );
  };

  const deletePet = (petId) => {
    setPets((currentPets) =>
      currentPets.filter(
        (pet) => pet.id !== petId
      )
    );

    setMedicalRecords((currentRecords) =>
      currentRecords.filter(
        (record) => record.petId !== petId
      )
    );
  };

  const addMedicalRecord = (newRecord) => {
    setMedicalRecords((currentRecords) => [
      ...currentRecords,
      newRecord,
    ]);
  };

  const updateMedicalRecord = (updatedRecord) => {
    setMedicalRecords((currentRecords) =>
      currentRecords.map((record) =>
        record.id === updatedRecord.id
          ? updatedRecord
          : record
      )
    );
  };

  const addAlert = (newAlert) => {
    setAlerts((currentAlerts) => [
      newAlert,
      ...currentAlerts,
    ]);

    if (
      newAlert.type === 'lost' &&
      newAlert.petId !== null
    ) {
      updatePetStatus(newAlert.petId, 'lost');
    }
  };

  const resolveAlert = (alertId) => {
    const alertToResolve = alerts.find(
      (alert) => alert.id === alertId
    );

    if (!alertToResolve) {
      return;
    }

    setAlerts((currentAlerts) =>
      currentAlerts.map((alert) =>
        alert.id === alertId
          ? {
              ...alert,
              status: 'resolved',
            }
          : alert
      )
    );

    if (
      alertToResolve.type === 'lost' &&
      alertToResolve.petId !== null
    ) {
      const hasAnotherActiveLostAlert = alerts.some(
        (alert) =>
          alert.id !== alertId &&
          alert.type === 'lost' &&
          alert.petId === alertToResolve.petId &&
          alert.status === 'active'
      );

      if (!hasAnotherActiveLostAlert) {
        updatePetStatus(
          alertToResolve.petId,
          'normal'
        );
      }
    }
  };

  return (
    <Routes>
      <Route path="/" element={<OnboardingPage />} />
      <Route path="/login" element={<LoginPage />} />
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
        element={<RegisterPetPage onAddPet={addPet} />}
      />
      <Route
        path="/mascotas/:id/perfil-publico"
        element={<PublicPetProfilePage pets={pets} />}
      />

      <Route element={<MainLayout />}>
        <Route
          path="/home"
          element={<HomePage pets={pets} />}
        />
        <Route
          path="/cuenta"
          element={<AccountPage />}
        />
        <Route
          path="/mascotas"
          element={
            <PetsPage
              pets={pets}
              onPetsLoaded={setPets}
              onUpdatePet={updatePet}
              onDeletePet={deletePet}
            />
            
          }
        />
        <Route
          path="/mascotas/:id/carnet"
          element={<DigitalCardPage pets={pets} />}
        />
        <Route
          path="/mascotas/:id/historial-medico"
          element={
            <MedicalHistoryPage
              medicalRecords={medicalRecords}
              onAddMedicalRecord={addMedicalRecord}
              onUpdateMedicalRecord={updateMedicalRecord}
            />
          }
        />
        <Route
          path="/alertas"
          element={
            <AlertsPage
              alerts={alerts}
              pets={pets}
              onAddAlert={addAlert}
              onResolveAlert={resolveAlert}
            />
          }
        />
        <Route path="/mapa" element={<MapPage />} />
      </Route>

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
}

export default App;