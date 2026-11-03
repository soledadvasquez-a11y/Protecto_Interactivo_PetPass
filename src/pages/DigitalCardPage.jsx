import {
  useNavigate,
  useParams,
} from 'react-router-dom';

import Button from '../components/Button/Button.jsx';

import pets from '../data/pets.js';

import './DigitalCardPage.css';

function DigitalCardPage() {
  const navigate = useNavigate();

  const { id } = useParams();

  /*
    Buscamos la mascota cuyo id coincida
    con el id recibido desde la URL.
  */
  const pet = pets.find(
    (item) => item.id === Number(id)
  );

  const handlePrint = () => {
    /*
      Solución provisional.
      El PDF real pertenece a Integración.
    */

    window.print();
  };

  /*
    Protección por si alguien escribe un id
    inexistente en la URL.
  */
  if (!pet) {
    return (
      <main className="page digital-card-page">
        <header className="digital-card-page__heading">
          <h1>Carnet digital</h1>
        </header>

        <p>Mascota no encontrada.</p>

        <div className="digital-card-page__actions">
          <Button
            variant="secondary"
            onClick={() =>
              navigate('/mascotas')
            }
          >
            Volver a Mis Mascotas
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="page digital-card-page">
      <header className="digital-card-page__heading">
        <h1>Carnet digital</h1>

        <p>
          Identificación digital de tu mascota.
        </p>
      </header>

      <section className="digital-card-page__card">
        <div className="digital-card-page__brand">
          <span>PetPass</span>

          <small>
            Identidad de mascota
          </small>
        </div>

        <div className="digital-card-page__pet">
          <div
            className="digital-card-page__photo"
            aria-hidden="true"
          >
            🐾
          </div>

          <div>
            <h2>{pet.name}</h2>

            <p>
              {pet.species} · {pet.breed}
            </p>

            <p>{pet.age}</p>
          </div>
        </div>

        <div className="digital-card-page__info">
          <div>
            <span>Tutor</span>

            <strong>
              Usuario PetPass
            </strong>
          </div>

          <div>
            <span>ID PetPass</span>

            <strong>
              PP-{pet.id}
            </strong>
          </div>
        </div>

        <div className="digital-card-page__qr">
          <div
            className="digital-card-page__qr-placeholder"
            aria-label="Código QR provisional"
          >
            <span>QR</span>
          </div>

          <p>
            Escanea para ver el perfil público
          </p>
        </div>
      </section>

      <div className="digital-card-page__actions">
        <Button
          variant="primary"
          onClick={() =>
            navigate(
              `/mascotas/${pet.id}/perfil-publico`
            )
          }
        >
          Ver perfil público
        </Button>

        <Button
          variant="secondary"
          onClick={handlePrint}
        >
          Descargar carnet
        </Button>
      </div>
    </main>
  );
}

export default DigitalCardPage;