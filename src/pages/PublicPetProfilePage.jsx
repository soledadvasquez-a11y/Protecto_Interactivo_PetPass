import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Button from '../components/Button/Button.jsx';
import AlertModal from '../components/AlertModal/AlertModal.jsx';
import DecorativeConfetti from '../components/decorative/DecorativeConfetti.jsx';

import './PublicPetProfilePage.css';

function PublicPetProfilePage() {
  const { id } = useParams();

  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [modalType, setModalType] =
    useState(null);

  const [isCalling, setIsCalling] =
    useState(false);

  useEffect(() => {
    async function loadPet() {
      setLoading(true);
      setError('');

      try {
        const response = await fetch(
          `/api/mascotas/${id}`
        );

        const data = await response.json();

        if (response.ok) {
          setPet(data);
        } else {
          setPet(null);

          setError(
            data.error ||
              'No se pudo cargar la mascota.'
          );
        }
      } catch {
        setPet(null);

        setError(
          'No se pudo conectar con la API. ¿Está encendida?'
        );
      } finally {
        setLoading(false);
      }
    }

    loadPet();
  }, [id]);

  const handleOpenGpsModal = () => {
    setModalType('permission');
  };

  const handleAcceptPermission = () => {
    setModalType('success');
  };

  const handleCloseModal = () => {
    setModalType(null);
  };

  if (loading) {
    return (
      <div className="pet-profile-page">
        <DecorativeConfetti />

        <main className="pet-profile-page__card">
          <section className="pet-profile-page__info-box">
            <p>
              Cargando mascota…
            </p>
          </section>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pet-profile-page">
        <DecorativeConfetti />

        <main className="pet-profile-page__card">
          <section className="pet-profile-page__info-box">
            <div className="pet-profile-page__missing-icon">
              🐾
            </div>

            <h1 className="pet-profile-page__title">
              No se pudo cargar
            </h1>

            <p
              className="pet-profile-page__subtitle"
              role="alert"
            >
              {error}
            </p>
          </section>
        </main>
      </div>
    );
  }

  if (!pet) {
    return (
      <div className="pet-profile-page">
        <DecorativeConfetti />

        <main className="pet-profile-page__card">
          <section className="pet-profile-page__info-box">
            <div className="pet-profile-page__missing-icon">
              🐾
            </div>

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
              <div
                className="pet-profile-page__call-placeholder"
                aria-hidden="true"
              >
                🐾
              </div>
            )}
          </div>

          <h1 className="pet-profile-page__call-title">
            Llamada de emergencia
          </h1>

          <p className="pet-profile-page__call-subtitle">
            Contactando al tutor de{' '}
            <strong>
              {pet.name}
            </strong>
          </p>

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
                <div
                  className="pet-profile-page__photo-placeholder"
                  aria-hidden="true"
                >
                  <span>
                    🐾
                  </span>

                  <small>
                    Sin fotografía
                  </small>
                </div>
              )}
            </div>

            <h1 className="pet-profile-page__title">
              {pet.status === 'lost'
                ? '¡Estoy perdido!'
                : `Hola, soy ${pet.name}`}
            </h1>

            <p className="pet-profile-page__subtitle">
              {pet.status === 'lost'
                ? 'Ayúdame a volver a casa'
                : 'Este es mi perfil público de PetPass'}
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
            {pet.status === 'lost' ? (
              <>
                <Button
                  variant="danger"
                  onClick={
                    handleOpenGpsModal
                  }
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
              </>
            ) : (
              <div className="pet-profile-page__safe-message">
                <span
                  aria-hidden="true"
                  className="pet-profile-page__safe-icon"
                >
                  ✓
                </span>

                <p>
                  Esta mascota no está
                  reportada como perdida.
                </p>
              </div>
            )}
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