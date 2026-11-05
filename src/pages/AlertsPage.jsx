import { useMemo, useState } from 'react';

import AlertCard from '../components/AlertCard/AlertCard.jsx';
import FormField from '../components/FormField/FormField.jsx';
import Button from '../components/Button/Button.jsx';
import DecorativeConfetti from '../components/decorative/DecorativeConfetti.jsx';

import './AlertsPage.css';

const FILTERS = [
  'Todos',
  'Perdidos',
  'En Adopción',
  'Emergencias',
];

const FILTER_TO_TYPE = {
  Perdidos: 'lost',
  'En Adopción': 'adoption',
  Emergencias: 'emergency',
};

const ZONAS = [
  { value: 'sopocachi', label: 'Sopocachi' },
  { value: 'miraflores', label: 'Miraflores' },
  { value: 'zona-sur', label: 'Zona Sur' },
  { value: 'el-alto', label: 'El Alto' },
  { value: 'centro', label: 'Centro' },
];

const EMPTY_FORM = {
  petId: '',
  petName: '',
  zone: '',
  description: '',
  contact: '',
};

function AlertsPage({
  alerts,
  pets,
  onAddAlert,
  onResolveAlert,
}) {
  const [activeFilter, setActiveFilter] =
    useState('Todos');
  const [selectedZone, setSelectedZone] =
    useState('');
  const [isModalOpen, setIsModalOpen] =
    useState(false);
  const [reportType, setReportType] =
    useState('Perdidos');
  const [formData, setFormData] = useState(
    EMPTY_FORM
  );

  const petOptions = pets.map((pet) => ({
    value: String(pet.id),
    label: pet.name,
  }));

  const filteredAlerts = useMemo(() => {
    return alerts.filter((alert) => {
      const selectedType =
        FILTER_TO_TYPE[activeFilter];

      const matchesType =
        activeFilter === 'Todos' ||
        alert.type === selectedType;

      const matchesZone =
        !selectedZone ||
        alert.zone === selectedZone;

      return matchesType && matchesZone;
    });
  }, [alerts, activeFilter, selectedZone]);

  const handleInputChange =
    (field) => (event) => {
      setFormData((current) => ({
        ...current,
        [field]: event.target.value,
      }));
    };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setReportType('Perdidos');
    setFormData(EMPTY_FORM);
  };

  const handleSubmitReport = (event) => {
    event.preventDefault();

    if (
      !formData.zone ||
      !formData.description.trim()
    ) {
      return;
    }

    const type =
      FILTER_TO_TYPE[reportType] || 'lost';

    const selectedPet = pets.find(
      (pet) =>
        pet.id === Number(formData.petId)
    );

    const selectedZoneData = ZONAS.find(
      (zone) => zone.value === formData.zone
    );

    const newAlert = {
      id: Date.now(),
      type,
      petId:
        type === 'lost' && selectedPet
          ? selectedPet.id
          : null,
      petName:
        type === 'lost'
          ? selectedPet?.name ||
            formData.petName.trim() ||
            'Mascota perdida'
          : type === 'adoption'
            ? formData.petName.trim() ||
              'En adopción'
            : 'Emergencia',
      photo:
        type === 'lost'
          ? selectedPet?.photo || null
          : null,
      zone: formData.zone,
      location: selectedZoneData
        ? `${selectedZoneData.label}, La Paz`
        : 'La Paz',
      date: 'Ahora',
      description: formData.description.trim(),
      contact: formData.contact.trim(),
      status: 'active',
    };

    onAddAlert(newAlert);
    handleCloseModal();
  };

  return (
    <div className="alerts-page">
      <DecorativeConfetti />

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
                ${
                  activeFilter === filter
                    ? 'alerts-page__tag--active'
                    : ''
                }
              `}
              onClick={() =>
                setActiveFilter(filter)
              }
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
            onChange={(event) =>
              setSelectedZone(event.target.value)
            }
            placeholder="Zona"
          />
        </div>
      </nav>

      <main className="alerts-page__grid">
        {filteredAlerts.length === 0 && (
          <p className="alerts-page__empty">
            No hay alertas para estos filtros.
          </p>
        )}

        {filteredAlerts.map((alert) => (
          <div
            key={alert.id}
            className={`
              alerts-page__card-col
              alerts-page__card-col--${alert.type}
              ${
                alert.status === 'resolved'
                  ? 'alerts-page__card-col--resolved'
                  : ''
              }
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

            <div className="alerts-page__status-row">
              <span>
                {alert.status === 'resolved'
                  ? 'Resuelta'
                  : 'Activa'}
              </span>

              {alert.status === 'active' && (
                <Button
                  variant="secondary"
                  onClick={() =>
                    onResolveAlert(alert.id)
                  }
                >
                  Marcar resuelta
                </Button>
              )}
            </div>
          </div>
        ))}
      </main>

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
                onClick={handleCloseModal}
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
                  Tipo de Alerta
                </span>

                <div className="alerts-page__tags">
                  {FILTERS
                    .filter(
                      (filter) => filter !== 'Todos'
                    )
                    .map((filter) => (
                      <button
                        key={filter}
                        type="button"
                        className={`
                          alerts-page__tag
                          ${
                            reportType === filter
                              ? 'alerts-page__tag--active'
                              : ''
                          }
                        `}
                        onClick={() =>
                          setReportType(filter)
                        }
                      >
                        {filter}
                      </button>
                    ))}
                </div>
              </div>

              {reportType === 'Perdidos' &&
                pets.length > 0 && (
                  <FormField
                    label="Mascota registrada"
                    type="select"
                    name="petId"
                    value={formData.petId}
                    options={petOptions}
                    onChange={handleInputChange(
                      'petId'
                    )}
                  />
                )}

              <FormField
                label="Nombre de la mascota"
                name="petName"
                value={formData.petName}
                onChange={handleInputChange(
                  'petName'
                )}
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
                onChange={handleInputChange(
                  'description'
                )}
              />

              <FormField
                label="Datos de contacto"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange(
                  'contact'
                )}
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