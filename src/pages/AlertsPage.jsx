
import { useState } from 'react';

import AlertCard from '../components/AlertCard/AlertCard.jsx';
import FormField from '../components/FormField/FormField.jsx';
import Button from '../components/Button/Button.jsx';

// Componente decorativo reutilizable
import DecorativeConfetti from '../components/decorative/DecorativeConfetti.jsx';

import posterLost from '../assets/poster-lost.svg';
import posterEmergency from '../assets/poster-emergency.svg';

import './AlertsPage.css';

const FILTERS = [
  'Todos',
  'Perdidos',
  'En Adopción',
  'Emergencias'
];

const ZONAS = [
  { value: 'sopocachi', label: 'Sopocachi' },
  { value: 'miraflores', label: 'Miraflores' },
  { value: 'zona-sur', label: 'Zona Sur' },
  { value: 'el-alto', label: 'El Alto' },
  { value: 'centro', label: 'Centro' },
];

const INITIAL_ALERTS = [
  {
    id: 1,
    type: 'lost',
    petName: 'Perdido',
    photo: posterLost,
    location: 'Sopocachi, La Paz',
    date: 'Ayer',
    description:
      'Visto por última vez cerca de Plaza Abaroa.',
  },
  {
    id: 2,
    type: 'emergency',
    petName: 'Emergencia',
    photo: posterEmergency,
    location: 'Miraflores, La Paz',
    date: 'Hoy',
    description:
      'Se busca donante canino urgente para transfusión.',
  },
];

function AlertsPage() {
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [selectedZone, setSelectedZone] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Formulario de Nuevo Reporte
  const [reportType, setReportType] = useState('Perdidos');

  const [formData, setFormData] = useState({
    petName: '',
    zone: '',
    description: '',
    contact: '',
  });

  const handleInputChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSubmitReport = (e) => {
    e.preventDefault();
    setIsModalOpen(false);
  };

  return (
    <div className="alerts-page">

      {/* Fondo decorativo reutilizable */}
      <DecorativeConfetti />

      {/* Cabecera: Título + Botón Nuevo Reporte */}
      <header className="alerts-page__header">

        <div className="alerts-page__title-box">
          <span className="alerts-page__highlight" />

          <h1 className="alerts-page__title">
            Comunidad y<br />alertas
          </h1>
        </div>

        <button
          type="button"
          className="alerts-page__add-btn"
          onClick={() => setIsModalOpen(true)}
          aria-label="Crear nuevo reporte"
        >
          +
        </button>
      </header>

      {/* Barra de filtros */}
      <nav
        className="alerts-page__filters-bar"
        aria-label="Filtrar alertas"
      >
        <div className="alerts-page__tags">

          {FILTERS.map((filter) => (
            <button
              key={filter}
              type="button"
              className={`
                alerts-page__tag
                alerts-page__tag--${filter.toLowerCase().replace(/\s+/g, '-')}
                ${
                  activeFilter === filter
                    ? 'alerts-page__tag--active'
                    : ''
                }
              `}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}

        </div>

        <div className="alerts-page__zone-select">
          <FormField
            type="select"
            name="filterZone"
            value={selectedZone}
            options={ZONAS}
            onChange={(e) =>
              setSelectedZone(e.target.value)
            }
            placeholder="Zona"
          />
        </div>
      </nav>

      {/* Grid de tarjetas de alerta */}
      <main className="alerts-page__grid">

        {INITIAL_ALERTS.map((alert) => (
          <div
            key={alert.id}
            className={`
              alerts-page__card-col
              alerts-page__card-col--${alert.type}
            `}
          >
            <h2 className="alerts-page__col-label">
              {alert.petName}
            </h2>

            <AlertCard
              type={alert.type}
              petName={alert.petName}
              photo={alert.photo}
              location={alert.location}
              date={alert.date}
              description={alert.description}
            />
          </div>
        ))}

      </main>

      {/* Modal: Nuevo Reporte */}
      {isModalOpen && (
        <div className="alerts-modal__overlay">

          <section
            className="alerts-modal__card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="alerts-modal-title"
          >

            <header className="alerts-modal__header">

              <h2
                id="alerts-modal-title"
                className="alerts-modal__title"
              >
                Nuevo Reporte
              </h2>

              <button
                type="button"
                className="alerts-modal__close-btn"
                onClick={() => setIsModalOpen(false)}
                aria-label="Cerrar modal"
              >
                ✕
              </button>
            </header>

            <form
              onSubmit={handleSubmitReport}
              className="alerts-modal__form"
            >

              <div className="alerts-modal__type-section">

                <span className="alerts-modal__label">
                  Tipo de{' '}
                  <span className="alerts-modal__tag-alert">
                    Alerta
                  </span>
                </span>

                <div className="alerts-page__tags">

                  {FILTERS.map((filter) => (
                    <button
                      key={filter}
                      type="button"
                      className={`
                        alerts-page__tag
                        alerts-page__tag--${filter.toLowerCase().replace(/\s+/g, '-')}
                        ${
                          reportType === filter
                            ? 'alerts-page__tag--active'
                            : ''
                        }
                      `}
                      onClick={() => setReportType(filter)}
                    >
                      {filter}
                    </button>
                  ))}

                </div>
              </div>

              <FormField
                label="Nombre de la mascota"
                name="petName"
                value={formData.petName}
                onChange={handleInputChange('petName')}
              />

              <FormField
                label="Zona"
                type="select"
                name="zone"
                value={formData.zone}
                options={ZONAS}
                onChange={handleInputChange('zone')}
              />

              <FormField
                label="Descripción detallada"
                name="description"
                value={formData.description}
                onChange={handleInputChange('description')}
              />

              <FormField
                label="Datos de contacto"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange('contact')}
              />

              <div className="alerts-modal__actions">
                <Button
                  variant="danger"
                  type="submit"
                >
                  Publicar Alerta
                </Button>
              </div>

            </form>
          </section>
        </div>
      )}

    </div>
  );
}

export default AlertsPage;
