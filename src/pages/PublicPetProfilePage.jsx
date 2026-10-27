
import { useState } from 'react';

import Button from '../components/Button/Button.jsx';
import AlertModal from '../components/AlertModal/AlertModal.jsx';

// Componente decorativo reutilizable
import OnboardingConfetti from '../components/decorative/DecorativeConfetti.jsx';

import pugPhoto from '../assets/pug-photo.svg';
import pugAvatar from '../assets/pug-avatar.svg';

import './PublicPetProfilePage.css';

function PublicPetProfilePage() {
  const [modalType, setModalType] = useState(null);
  const [isCalling, setIsCalling] = useState(false);

  const handleOpenGpsModal = () => {
    setModalType('permission');
  };

  const handleAcceptPermission = () => {
    setModalType('success');
  };

  const handleCloseModal = () => {
    setModalType(null);
  };

  return (
    <div className="pet-profile-page">

      {/* Fondo decorativo reutilizable */}
      <OnboardingConfetti />

      {isCalling ? (
        /* Pantalla de llamada en curso */
        <main className="pet-profile-page__call-card">

          <div className="pet-profile-page__call-avatar-wrapper">
            <img
              src={pugAvatar}
              alt="Toby"
              className="pet-profile-page__call-avatar"
            />
          </div>

          <h1 className="pet-profile-page__call-title">
            ¡Estoy perdido!
          </h1>

          <div className="pet-profile-page__call-controls">
            <button
              type="button"
              className="pet-profile-page__call-circle-btn"
            >
              <span className="pet-profile-page__call-icon">
                🔊
              </span>
              <span>Speaker</span>
            </button>

            <button
              type="button"
              className="pet-profile-page__call-circle-btn"
            >
              <span className="pet-profile-page__call-icon">
                🔇
              </span>
              <span>Mute</span>
            </button>

            <button
              type="button"
              className="pet-profile-page__call-circle-btn"
            >
              <span className="pet-profile-page__call-icon">
                ▦
              </span>
              <span>Keypad</span>
            </button>
          </div>

          <button
            type="button"
            className="pet-profile-page__end-call-btn"
            onClick={() => setIsCalling(false)}
            aria-label="Finalizar llamada"
          >
            🕽
          </button>
        </main>
      ) : (
        /* Vista normal del perfil público */
        <main className="pet-profile-page__card">

          <section className="pet-profile-page__info-box">
            <div className="pet-profile-page__photo-container">
              <img
                src={pugPhoto}
                alt="Toby"
                className="pet-profile-page__pet-photo"
              />
            </div>

            <h1 className="pet-profile-page__title">
              ¡Estoy perdido!
            </h1>

            <p className="pet-profile-page__subtitle">
              Ayudame a volver a casa
            </p>

            <div className="pet-profile-page__data">
              <p>
                <strong>Nombre:</strong> Toby
              </p>
              <p>
                <strong>Raza:</strong> Pug
              </p>
            </div>
          </section>

          <footer className="pet-profile-page__actions">
            <Button
              variant="danger"
              onClick={handleOpenGpsModal}
            >
              Enviar Alerta Gps
            </Button>

            <button
              type="button"
              className="pet-profile-page__call-action-btn"
              onClick={() => setIsCalling(true)}
            >
              Llamada de emergencia
            </button>
          </footer>
        </main>
      )}

      {/* Modal de permiso GPS */}
      <AlertModal
        isOpen={modalType === 'permission'}
        variant="permission"
        title="¿Permitir que PetPass acceda a tu ubicación?"
        message=""
        actionLabel="Aceptar"
        secondaryLabel="Rechazar"
        onAction={handleAcceptPermission}
        onSecondary={handleCloseModal}
        onClose={handleCloseModal}
      />

      {/* Modal de confirmación */}
      <AlertModal
        isOpen={modalType === 'success'}
        variant="success"
        title="¡Alerta enviada!"
        message="El tutor ya tiene la ubicación, por favor quédate con el perrito unos minutos."
        actionLabel="Aceptar"
        onAction={handleCloseModal}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default PublicPetProfilePage;
