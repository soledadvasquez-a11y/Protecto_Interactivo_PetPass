import {
  useEffect,
  useState,
} from 'react';
import {
  useNavigate,
  useParams,
} from 'react-router-dom';
import Button from '../components/Button/Button.jsx';
import './DigitalCardPage.css';

function DigitalCardPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
          setError(
            data.error ||
              'No se pudo cargar la mascota.'
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
    loadPet();
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <main className="page digital-card-page">
        <header className="digital-card-page__heading">
          <h1>Carnet digital</h1>
        </header>
        <p>Cargando mascota…</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="page digital-card-page">
        <header className="digital-card-page__heading">
          <h1>Carnet digital</h1>
        </header>
        <p role="alert">{error}</p>
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
            {pet.photo ? (
              <img
                src={pet.photo}
                alt=""
              />
            ) : (
              '🐾'
            )}
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