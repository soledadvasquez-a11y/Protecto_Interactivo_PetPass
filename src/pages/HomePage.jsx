import { useNavigate } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  const navigate = useNavigate();

  return (
    <main className="page home-page">
      {/* Tarjeta de Saludo con Huella */}
      <section className="home-page__welcome">
        <div className="home-page__welcome-text">
          <h1>Hola, Usuario!</h1>
        </div>
        <div className="home-page__welcome-paw" aria-hidden="true">
          <svg viewBox="0 0 100 100" fill="#B3B07A" width="90" height="90">
            <circle cx="25" cy="30" r="11" />
            <circle cx="48" cy="18" r="11" />
            <circle cx="72" cy="28" r="11" />
            <circle cx="88" cy="50" r="10" />
            <path d="M 30 62 C 25 46, 75 46, 70 62 C 65 76, 35 76, 30 62 Z" />
          </svg>
        </div>
      </section>

      {/* Sección Mis Mascotas */}
      <section className="home-page__pets">
        <h2>Mis Mascotas</h2>

        <button
          className="home-page__register-btn"
          onClick={() => navigate('/mascotas/nueva')}
        >
          <div className="home-page__register-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E16E42" strokeWidth="3.5" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </div>
          <div className="home-page__register-text">
            <h3>Registrar a mi primera mascota</h3>
            <p>Crea el PetPass de tu mascota</p>
          </div>
        </button>
      </section>
    </main>
  );
}

export default HomePage;