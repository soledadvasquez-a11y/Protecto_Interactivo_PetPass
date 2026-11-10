import {
  useEffect,
  useMemo,
  useState,
} from 'react';

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

const FILTER_CLASS = {
  Todos: 'all',
  Perdidos: 'lost',
  'En Adopción': 'adoption',
  Emergencias: 'emergency',
};

const ZONAS = [
  {
    value: 'sopocachi',
    label: 'Sopocachi',
  },
  {
    value: 'miraflores',
    label: 'Miraflores',
  },
  {
    value: 'zona-sur',
    label: 'Zona Sur',
  },
  {
    value: 'el-alto',
    label: 'El Alto',
  },
  {
    value: 'centro',
    label: 'Centro',
  },
];

const EMPTY_FORM = {
  petId: '',
  petName: '',
  zone: '',
  description: '',
  contact: '',
};

function AlertsPage() {
  const [alerts, setAlerts] =
    useState([]);

  const [pets, setPets] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState('');

  const [actionError, setActionError] =
    useState('');

  const [saving, setSaving] =
    useState(false);

  const [activeFilter, setActiveFilter] =
    useState('Todos');

  const [
    selectedZone,
    setSelectedZone,
  ] = useState('');

  const [
    isModalOpen,
    setIsModalOpen,
  ] = useState(false);

  const [reportType, setReportType] =
    useState('Perdidos');

  const [formData, setFormData] =
    useState(EMPTY_FORM);

  useEffect(() => {
    async function loadAlertsAndPets() {
      setLoading(true);
      setError('');

      try {
        const [alertsResponse, petsResponse] =
          await Promise.all([
            fetch('/api/alertas'),
            fetch('/api/mascotas'),
          ]);

        const [alertsData, petsData] =
          await Promise.all([
            alertsResponse.json(),
            petsResponse.json(),
          ]);

        if (!alertsResponse.ok) {
          setError(
            alertsData.error ||
              'No se pudieron cargar las alertas.'
          );
          return;
        }

        if (!petsResponse.ok) {
          setError(
            petsData.error ||
              'No se pudieron cargar las mascotas.'
          );
          return;
        }

        setAlerts(alertsData);
        setPets(petsData);
      } catch {
        setError(
          'No se pudo conectar con la API. ¿Está encendida?'
        );
      } finally {
        setLoading(false);
      }
    }

    loadAlertsAndPets();
  }, []);

  const petOptions = pets.map((pet) => ({
    value: String(pet.id),
    label: pet.name,
  }));

  /*
    Filtra únicamente por:
    - tipo
    - zona

    status se muestra y modifica,
    pero NO es filtro.
  */
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

      return (
        matchesType &&
        matchesZone
      );
    });
  }, [
    alerts,
    activeFilter,
    selectedZone,
  ]);

  const handleInputChange =
    (field) => (event) => {
      setFormData((current) => ({
        ...current,
        [field]: event.target.value,
      }));
      setActionError('');
    };

  const handleReportTypeChange = (
    nextType
  ) => {
    setReportType(nextType);

    /*
      Evitamos conservar una mascota
      seleccionada al cambiar de tipo.
    */
    setFormData((current) => ({
      ...current,
      petId: '',
    }));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setReportType('Perdidos');
    setFormData(EMPTY_FORM);
    setActionError('');
  };

  const handleSubmitReport = async (
    event
  ) => {
    event.preventDefault();

    if (
      !formData.zone ||
      !formData.description.trim()
    ) {
      setActionError(
        'Completa la zona y la descripción.'
      );
      return;
    }

    const type =
      FILTER_TO_TYPE[reportType] ||
      'lost';

    const selectedPet =
      pets.find(
        (pet) =>
          pet.id ===
          Number(formData.petId)
      );

    const selectedZoneData =
      ZONAS.find(
        (zone) =>
          zone.value ===
          formData.zone
      );

    const payload = {
      type,
      petId:
        type === 'lost' && selectedPet
          ? selectedPet.id
          : null,
      petName:
        type === 'lost'
          ? (
              selectedPet?.name ||
              formData.petName.trim() ||
              'Mascota perdida'
            )
          : type === 'adoption'
            ? (
                formData.petName.trim() ||
                'En adopción'
              )
            : 'Emergencia',
      photo:
        type === 'lost'
          ? selectedPet?.photo || null
          : null,
      zone: formData.zone,
      location:
        selectedZoneData
          ? `${selectedZoneData.label}, La Paz`
          : 'La Paz',
      description:
        formData.description.trim(),
      contact:
        formData.contact.trim(),
    };

    setSaving(true);
    setActionError('');

    try {
      const response = await fetch(
        '/api/alertas',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setActionError(
          data.error ||
            'No se pudo publicar la alerta.'
        );
        return;
      }

      setAlerts((currentAlerts) => [
        data,
        ...currentAlerts,
      ]);

      handleCloseModal();
    } catch {
      setActionError(
        'No se pudo conectar con la API. ¿Está encendida?'
      );
    } finally {
      setSaving(false);
    }
  };

  const handleResolveAlert = async (
    alertId
  ) => {
    setActionError('');

    try {
      const response = await fetch(
        `/api/alertas/${alertId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            status: 'resolved',
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setActionError(
          data.error ||
            'No se pudo actualizar la alerta.'
        );
        return;
      }

      setAlerts((currentAlerts) =>
        currentAlerts.map((alert) =>
          alert.id === data.id
            ? data
            : alert
        )
      );
    } catch {
      setActionError(
        'No se pudo conectar con la API. ¿Está encendida?'
      );
    }
  };

  return (
    <div className="alerts-page">

      <DecorativeConfetti />

      {/* HEADER */}

      <header className="alerts-page__header">

        <div className="alerts-page__title-box">

          <span className="alerts-page__highlight" />

          <div>
            <h1 className="alerts-page__title">
              Comunidad y alertas
            </h1>

            <p className="alerts-page__subtitle">
              Conecta, ayuda y reporta situaciones
              importantes para las mascotas.
            </p>
          </div>

        </div>

        <button
          type="button"
          className="alerts-page__add-btn"
          onClick={() =>
            setIsModalOpen(true)
          }
          aria-label="Crear nuevo reporte"
        >
          +
        </button>

      </header>

      {/* FILTROS */}

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
                alerts-page__tag--${FILTER_CLASS[filter]}
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
            placeholder="Todas las zonas"
            onChange={(event) =>
              setSelectedZone(
                event.target.value
              )
            }
          />

        </div>

      </nav>

      {/* LISTA */}

      <main className="alerts-page__grid">

        {loading && (
          <section className="alerts-page__empty">
            <p>Cargando alertas…</p>
          </section>
        )}

        {!loading && error && (
          <section className="alerts-page__empty">
            <h2>No se pudo cargar</h2>
            <p role="alert">{error}</p>
          </section>
        )}

        {!loading && actionError && (
          <section className="alerts-page__empty">
            <p role="alert">{actionError}</p>
          </section>
        )}

        {!loading &&
          !error &&
          filteredAlerts.length === 0 && (
          <section className="alerts-page__empty">

            <span aria-hidden="true">
              🐾
            </span>

            <h2>
              No encontramos alertas
            </h2>

            <p>
              Prueba con otro tipo de alerta
              o cambia la zona seleccionada.
            </p>

          </section>
        )}

        {!loading &&
          !error &&
          filteredAlerts.map((alert) => (

          <article
            key={alert.id}
            className={`
              alerts-page__item
              ${
                alert.status === 'resolved'
                  ? 'alerts-page__item--resolved'
                  : ''
              }
            `}
          >

            <AlertCard
              type={alert.type}
              petName={alert.petName}
              photo={alert.photo}
              location={alert.location}
              date={alert.date}
              description={
                alert.description
              }
              contact={alert.contact}
            />

            <footer className="alerts-page__status-row">

              <span
                className={`
                  alerts-page__status
                  alerts-page__status--${alert.status}
                `}
              >
                {alert.status === 'resolved'
                  ? 'Resuelta'
                  : 'Activa'}
              </span>

              {alert.status ===
                'active' && (
                <Button
                  variant="secondary"
                  onClick={() =>
                    handleResolveAlert(
                      alert.id
                    )
                  }
                >
                  Marcar resuelta
                </Button>
              )}

            </footer>

          </article>

        ))}

      </main>

      {/* MODAL */}

      {isModalOpen && (
        <div className="alerts-modal__overlay">

          <section
            className="alerts-modal__card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="alerts-modal-title"
          >

            <header className="alerts-modal__header">

              <div>
                <h2
                  id="alerts-modal-title"
                  className="alerts-modal__title"
                >
                  Nuevo reporte
                </h2>

                <p className="alerts-modal__subtitle">
                  Comparte la información necesaria
                  con la comunidad PetPass.
                </p>
              </div>

              <button
                type="button"
                className="alerts-modal__close-btn"
                onClick={
                  handleCloseModal
                }
                aria-label="Cerrar modal"
              >
                ✕
              </button>

            </header>

            <form
              onSubmit={
                handleSubmitReport
              }
              className="alerts-modal__form"
            >

              <div className="alerts-modal__type-section">

                <span className="alerts-modal__label">
                  Tipo de alerta
                </span>

                <div className="alerts-page__tags">

                  {FILTERS
                    .filter(
                      (filter) =>
                        filter !==
                        'Todos'
                    )
                    .map((filter) => (
                      <button
                        key={filter}
                        type="button"
                        className={`
                          alerts-page__tag
                          alerts-page__tag--${FILTER_CLASS[filter]}
                          ${
                            reportType ===
                            filter
                              ? 'alerts-page__tag--active'
                              : ''
                          }
                        `}
                        onClick={() =>
                          handleReportTypeChange(
                            filter
                          )
                        }
                      >
                        {filter}
                      </button>
                    ))}

                </div>

              </div>

              {reportType ===
                'Perdidos' &&
                pets.length > 0 && (

                  <FormField
                    label="Mascota registrada"
                    type="select"
                    name="petId"
                    value={
                      formData.petId
                    }
                    options={
                      petOptions
                    }
                    placeholder="Selecciona una mascota"
                    onChange={
                      handleInputChange(
                        'petId'
                      )
                    }
                  />

                )}

              {reportType !==
                'Emergencias' && (

                  <FormField
                    label="Nombre de la mascota"
                    name="petName"
                    value={
                      formData.petName
                    }
                    placeholder={
                      reportType ===
                      'Perdidos'
                        ? 'Ej. Luna'
                        : 'Ej. Nala'
                    }
                    onChange={
                      handleInputChange(
                        'petName'
                      )
                    }
                  />

                )}

              <FormField
                label="Zona"
                type="select"
                name="zone"
                value={formData.zone}
                options={ZONAS}
                placeholder="Selecciona una zona"
                onChange={
                  handleInputChange(
                    'zone'
                  )
                }
              />

              <FormField
                label="Descripción"
                name="description"
                value={
                  formData.description
                }
                placeholder="Describe brevemente la situación"
                onChange={
                  handleInputChange(
                    'description'
                  )
                }
              />

              <FormField
                label="Datos de contacto"
                name="contact"
                value={
                  formData.contact
                }
                placeholder="Teléfono u otro medio de contacto"
                onChange={
                  handleInputChange(
                    'contact'
                  )
                }
              />

              {actionError && (
                <p role="alert">
                  {actionError}
                </p>
              )}

              <div className="alerts-modal__actions">

                <Button
                  variant="danger"
                  type="submit"
                  disabled={saving}
                >
                  {saving
                    ? 'Publicando…'
                    : 'Publicar alerta'}
                </Button>

                <Button
                  variant="secondary"
                  type="button"
                  onClick={
                    handleCloseModal
                  }
                >
                  Cancelar
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