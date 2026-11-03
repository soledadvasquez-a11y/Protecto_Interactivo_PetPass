import { useNavigate } from 'react-router-dom';

import PetCard from '../components/PetCard/PetCard.jsx';

import pets from '../data/pets.js';

import './HomePage.css';

function HomePage() {
  const navigate = useNavigate();

  const handleAddPet = () => {
    navigate('/mascotas/nueva');
  };

  return (
    <main className="page home-page">

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
            fill="#B3B07A"
            width="90"
            height="90"
          >
            <circle cx="25" cy="30" r="11" />
            <circle cx="48" cy="18" r="11" />
            <circle cx="72" cy="28" r="11" />
            <circle cx="88" cy="50" r="10" />

            <path
              d="M 30 62 C 25 46, 75 46, 70 62 C 65 76, 35 76, 30 62 Z"
            />
          </svg>
        </div>

      </section>

      <section className="home-page__pets">

        <h2>Mis Mascotas</h2>

        {pets.length === 0 ? (

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
              no tengas una mascota. Cuando quieras,
              puedes registrar una desde aquí.
            </p>

            <button
              type="button"
              className="home-page__register-btn"
              onClick={handleAddPet}
            >
              <div className="home-page__register-icon">
                +
              </div>

              <div className="home-page__register-text">
                <h3>
                  Registrar mascota
                </h3>

                <p>
                  Crea su identidad digital PetPass
                </p>
              </div>
            </button>

          </div>

        ) : (

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
                +
              </div>

              <div className="home-page__register-text">
                <h3>
                  Agregar mascota
                </h3>

                <p>
                  Crea el PetPass de otra mascota
                </p>
              </div>
            </button>
          </>

        )}

      </section>

    </main>
  );
}

export default HomePage;