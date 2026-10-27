import { useNavigate } from 'react-router-dom';

import PetCard from '../components/PetCard/PetCard.jsx';
import Button from '../components/Button/Button.jsx';

import './HomePage.css';

function HomePage() {
  const navigate = useNavigate();

  return (
    <main className="page home-page">
      <section className="home-page__welcome">
        <h1>Hola, Usuario!</h1>

        <p>
          Bienvenido a PetPass. Aquí puedes acceder rápidamente
          a la información de tus mascotas.
        </p>
      </section>

      <section className="home-page__pets">
        <div className="home-page__section-heading">
          <h2>Mis Mascotas</h2>

          <Button
            variant="primary"
            onClick={() => navigate('/mascotas/nueva')}
          >
            Agregar mascota
          </Button>
        </div>

        <div className="home-page__pet-list">
          <PetCard
            variant="compact"
            name="Toby"
            species="Perro"
            breed="Pug"
            age="5 años"
          />
        </div>
      </section>
    </main>
  );
}

export default HomePage;