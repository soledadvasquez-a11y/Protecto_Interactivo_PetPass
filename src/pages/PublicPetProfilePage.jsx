import { useState } from 'react';
import { useParams } from 'react-router-dom';

import Button from '../components/Button/Button.jsx';
import AlertModal from '../components/AlertModal/AlertModal.jsx';

import DecorativeConfetti from '../components/decorative/DecorativeConfetti.jsx';

import pets from '../data/pets.js';

import './PublicPetProfilePage.css';

function PublicPetProfilePage() {
  const { id } = useParams();

  const [modalType, setModalType] =
    useState(null);

  const [isCalling, setIsCalling] =
    useState(false);

  const pet = pets.find(
    (item) => item.id === Number(id)
  );

  const handleOpenGpsModal = () => {
    setModalType('permission');
  };

  const handleAcceptPermission = () => {
    setModalType('success');
  };

  const handleCloseModal = () => {
    setModalType(null);
  };

  if (!pet) {
    return (
      <div className="pet-profile-page">

        <DecorativeConfetti />

        <main className="pet-profile-page__card">

          <section className="pet-profile-page__info-box">

            <h1 className="pet-profile-page__title">
              Mascota no encontrada
            </h1>

            <p className="pet-profile-page__subtitle">
              El perfil solicitado no existe.
            </p>

          </section>

        </main>

      </div>
    );
  }

  return (
    <div className="pet-profile-page">

      <DecorativeConfetti />

      {isCalling ? (

        <main className="pet-profile-page__call-card">

          <div className="pet-profile-page__call-avatar-wrapper">

            {pet.photo ? (
              <img
                src={pet.photo}
                alt={pet.name}
                className="pet-profile-page__call-avatar"
              />
            ) : (
              <span aria-hidden="true">
                🐾
              </span>
            )}

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

              <span>
                Speaker
              </span>
            </button>

            <button
              type="button"
              className="pet-profile-page__call-circle-btn"
            >
              <span className="pet-profile-page__call-icon">
                🔇
              </span>

              <span>
                Mute
              </span>
            </button>

            <button
              type="button"
              className="pet-profile-page__call-circle-btn"
            >
              <span className="pet-profile-page__call-icon">
                ▦
              </span>

              <span>
                Keypad
              </span>
            </button>

          </div>

          <button
            type="button"
            className="pet-profile-page__end-call-btn"
            onClick={() =>
              setIsCalling(false)
            }
            aria-label="Finalizar llamada"
          >
            🕽
          </button>

        </main>

      ) : (

        <main className="pet-profile-page__card">

          <section className="pet-profile-page__info-box">

            <div className="pet-profile-page__photo-container">

              {pet.photo ? (
                <img
                  src={pet.photo}
                  alt={pet.name}
                  className="pet-profile-page__pet-photo"
                />
              ) : (
                <span aria-hidden="true">
                  🐾
                </span>
              )}

            </div>

            <h1 className="pet-profile-page__title">
              ¡Estoy perdido!
            </h1>

            <p className="pet-profile-page__subtitle">
              Ayúdame a volver a casa
            </p>

            <div className="pet-profile-page__data">

              <p>
                <strong>
                  Nombre:
                </strong>{' '}
                {pet.name}
              </p>

              <p>
                <strong>
                  Especie:
                </strong>{' '}
                {pet.species}
              </p>

              <p>
                <strong>
                  Raza:
                </strong>{' '}
                {pet.breed}
              </p>

            </div>

          </section>

          <footer className="pet-profile-page__actions">

            <Button
              variant="danger"
              onClick={handleOpenGpsModal}
            >
              Enviar Alerta GPS
            </Button>

            <button
              type="button"
              className="pet-profile-page__call-action-btn"
              onClick={() =>
                setIsCalling(true)
              }
            >
              Llamada de emergencia
            </button>

          </footer>

        </main>

      )}

      <AlertModal
        isOpen={
          modalType === 'permission'
        }
        variant="permission"
        title="¿Permitir que PetPass acceda a tu ubicación?"
        message=""
        actionLabel="Aceptar"
        secondaryLabel="Rechazar"
        onAction={
          handleAcceptPermission
        }
        onSecondary={
          handleCloseModal
        }
        onClose={
          handleCloseModal
        }
      />

      <AlertModal
        isOpen={
          modalType === 'success'
        }
        variant="success"
        title="¡Alerta enviada!"
        message="El tutor ya tiene la ubicación, por favor quédate con la mascota unos minutos."
        actionLabel="Aceptar"
        onAction={
          handleCloseModal
        }
        onClose={
          handleCloseModal
        }
      />

    </div>
  );
}

export default PublicPetProfilePage;