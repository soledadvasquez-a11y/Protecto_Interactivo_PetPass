import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PetCard from '../components/PetCard/PetCard.jsx';

import './HomePage.css';

function HomePage() {
  const navigate = useNavigate();

  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadPets() {
      setLoading(true);
      setError('');

      try {
        const response = await fetch(
          '/api/mascotas'
        );

        const data = await response.json();

        if (response.ok) {
          setPets(data);
        } else {
          setError(
            data.error ||
              'No se pudieron cargar las mascotas.'
          );
        }
      } catch {
        setError(
          'No se pudo conectar con la API. ¿Está encendida?'
        );
      } finally {
        setLoading(false);
      }
    }

    loadPets();
  }, []);

  const handleAddPet = () => {
    navigate('/mascotas/nueva');
  };

  return (
    <div className="home-page">
      <main className="home-content">
        <section className="home-page__welcome">
          <div className="home-page__welcome-text">
            <h1>Hola, Usuario!</h1>
          </div>

          <div
            className="home-page__welcome-paw"
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 100 100"
              fill="#C2C095"
              width="130"
              height="130"
            >
              <circle
                cx="20"
                cy="35"
                r="12"
              />
              <circle
                cx="45"
                cy="18"
                r="12"
              />
              <circle
                cx="75"
                cy="28"
                r="12"
              />
              <circle
                cx="92"
                cy="55"
                r="11"
              />
              <path d="M 28 68 C 22 46, 82 46, 76 68 C 70 86, 34 86, 28 68 Z" />
            </svg>
          </div>
        </section>

        <section className="home-page__pets">
          <h2>Mis Mascotas</h2>

          {loading && (
            <div className="home-page__empty">
              <p>
                Cargando mascotas…
              </p>
            </div>
          )}

          {!loading && error && (
            <div className="home-page__empty">
              <h3>
                No se pudo cargar
              </h3>

              <p role="alert">
                {error}
              </p>
            </div>
          )}

          {!loading &&
            !error &&
            pets.length === 0 && (
              <div className="home-page__empty">
                <div
                  className="home-page__empty-icon"
                  aria-hidden="true"
                >
                  🐾
                </div>

                <h3>
                  Aún no tienes mascotas registradas
                </h3>

                <p>
                  Puedes usar PetPass aunque todavía
                  no tengas una mascota. Cuando
                  quieras, puedes registrar una
                  desde aquí.
                </p>

                <button
                  type="button"
                  className="home-page__register-btn"
                  onClick={handleAddPet}
                >
                  <div className="home-page__register-icon">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#E16E42"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line
                        x1="12"
                        y1="5"
                        x2="12"
                        y2="19"
                      />

                      <line
                        x1="5"
                        y1="12"
                        x2="19"
                        y2="12"
                      />
                    </svg>
                  </div>

                  <div className="home-page__register-text">
                    <h3>
                      Registrar mascota
                    </h3>

                    <p>
                      Crea el PetPass de tu mascota
                    </p>
                  </div>
                </button>
              </div>
            )}

          {!loading &&
            !error &&
            pets.length > 0 && (
              <>
                {pets.map((pet) => (
                  <PetCard
                    key={pet.id}
                    variant="compact"
                    name={pet.name}
                    photo={pet.photo}
                    species={pet.species}
                    breed={pet.breed}
                    age={pet.age}
                    weight={pet.weight}
                    onClick={() =>
                      navigate(
                        `/mascotas/${pet.id}/carnet`
                      )
                    }
                  />
                ))}

                <button
                  type="button"
                  className="home-page__register-btn"
                  onClick={handleAddPet}
                >
                  <div className="home-page__register-icon">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#E16E42"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line
                        x1="12"
                        y1="5"
                        x2="12"
                        y2="19"
                      />

                      <line
                        x1="5"
                        y1="12"
                        x2="19"
                        y2="12"
                      />
                    </svg>
                  </div>

                  <div className="home-page__register-text">
                    <h3>
                      Registrar mascota
                    </h3>

                    <p>
                      Crea el PetPass de tu mascota
                    </p>
                  </div>
                </button>
              </>
            )}
        </section>
      </main>
    </div>
  );
}

export default HomePage;