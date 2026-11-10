import {
  useEffect,
  useMemo,
  useState,
} from 'react';

import { useParams } from 'react-router-dom';

import FilterTab from '../components/FilterTab/FilterTab.jsx';
import MedicalRecordCard from '../components/MedicalRecordCard/MedicalRecordCard.jsx';
import FormField from '../components/FormField/FormField.jsx';
import Button from '../components/Button/Button.jsx';


import './MedicalHistoryPage.css';

const EMPTY_MEDICAL_FORM = {
  type: 'vaccine',
  title: '',
  date: '',
  nextDate: '',
  place: '',
  description: '',
};

const TYPE_OPTIONS = [
  {
    value: 'vaccine',
    label: 'Vacuna',
  },
  {
    value: 'deworming',
    label: 'Desparasitación',
  },
  {
    value: 'consultation',
    label: 'Consulta',
  },
];

function MedicalHistoryPage() {
  const { id } = useParams();

  const [medicalRecords, setMedicalRecords] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState('');

  const [formError, setFormError] =
    useState('');

  const [saving, setSaving] =
    useState(false);

  const [activeFilter, setActiveFilter] =
    useState('vaccine');

  const [medicalFormOpen, setMedicalFormOpen] =
    useState(false);

  const [
    medicalFormData,
    setMedicalFormData,
  ] = useState(EMPTY_MEDICAL_FORM);

  const [
    editingRecordId,
    setEditingRecordId,
  ] = useState(null);

  useEffect(() => {
    async function loadMedicalRecords() {
      setLoading(true);
      setError('');

      try {
        const response = await fetch(
          `/api/mascotas/${id}/historial`
        );

        const data = await response.json();

        if (response.ok) {
          setMedicalRecords(data);
        } else {
          setError(
            data.error ||
              'No se pudo cargar el historial médico.'
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

    loadMedicalRecords();
  }, [id]);

  const visibleRecords = useMemo(
    () =>
      medicalRecords.filter(
        (record) =>
          record.type === activeFilter
      ),
    [medicalRecords, activeFilter]
  );

  const handleMedicalChange =
    (field) => (event) => {
      setMedicalFormData((current) => ({
        ...current,
        [field]: event.target.value,
      }));
      setFormError('');
    };

  const handleOpenNewRecord = () => {
    setMedicalFormData({
      ...EMPTY_MEDICAL_FORM,
      type: activeFilter,
    });

    setEditingRecordId(null);
    setFormError('');
    setMedicalFormOpen(true);
  };

  const handleOpenEditRecord = (record) => {
    setMedicalFormData({
      type: record.type,
      title: record.title,
      date: record.date,
      nextDate: record.nextDate ?? '',
      place: record.place,
      description: record.description,
    });

    setEditingRecordId(record.id);
    setFormError('');
    setMedicalFormOpen(true);
  };

  const handleCloseMedicalForm = () => {
    setMedicalFormOpen(false);

    setMedicalFormData(
      EMPTY_MEDICAL_FORM
    );

    setEditingRecordId(null);
    setFormError('');
  };

  const handleSaveMedicalRecord = async () => {
    if (
      !medicalFormData.title.trim() ||
      !medicalFormData.date
    ) {
      setFormError(
        'Completa al menos el título y la fecha.'
      );
      return;
    }

    setSaving(true);
    setFormError('');

    try {
      const isEditing =
        editingRecordId !== null;

      const url = isEditing
        ? `/api/historial/${editingRecordId}`
        : `/api/mascotas/${id}/historial`;

      const response = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(medicalFormData),
      });

      const data = await response.json();

      if (!response.ok) {
        setFormError(
          data.error ||
            'No se pudo guardar el registro.'
        );
        return;
      }

      if (isEditing) {
        setMedicalRecords((currentRecords) =>
          currentRecords.map((record) =>
            record.id === data.id
              ? data
              : record
          )
        );
      } else {
        setMedicalRecords((currentRecords) => [
          ...currentRecords,
          data,
        ]);
      }

      setActiveFilter(data.type);
      handleCloseMedicalForm();
    } catch {
      setFormError(
        'No se pudo conectar con la API. ¿Está encendida?'
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="page medical-history-page">

      <header className="medical-history-page__heading">

        <div>
          <h1>
            Historial médico
          </h1>

          <p>
            Consulta y administra los registros
            de salud de tu mascota.
          </p>
        </div>

        <Button
          variant="primary"
          onClick={handleOpenNewRecord}
        >
          Agregar registro
        </Button>

      </header>

      <div className="medical-history-page__filters">

        <FilterTab
          label="Vacunas"
          active={
            activeFilter === 'vaccine'
          }
          onClick={() =>
            setActiveFilter('vaccine')
          }
        />

        <FilterTab
          label="Desparasitación"
          active={
            activeFilter === 'deworming'
          }
          onClick={() =>
            setActiveFilter('deworming')
          }
        />

        <FilterTab
          label="Consultas"
          active={
            activeFilter === 'consultation'
          }
          onClick={() =>
            setActiveFilter('consultation')
          }
        />

      </div>

      {medicalFormOpen && (

        <section className="medical-history-page__form">

          <h2>
            {editingRecordId !== null
              ? 'Editar registro'
              : 'Nuevo registro'}
          </h2>

          <FormField
            label="Tipo"
            type="select"
            value={medicalFormData.type}
            options={TYPE_OPTIONS}
            onChange={
              handleMedicalChange('type')
            }
          />

          <FormField
            label="Título"
            type="text"
            value={medicalFormData.title}
            placeholder="Ej. Vacuna antirrábica"
            onChange={
              handleMedicalChange('title')
            }
          />

          <FormField
            label="Fecha"
            type="date"
            value={medicalFormData.date}
            onChange={
              handleMedicalChange('date')
            }
          />

          <FormField
            label="Próxima fecha"
            type="date"
            value={
              medicalFormData.nextDate
            }
            onChange={
              handleMedicalChange(
                'nextDate'
              )
            }
          />

          <FormField
            label="Lugar"
            type="text"
            value={medicalFormData.place}
            placeholder="Ej. Veterinaria Central"
            onChange={
              handleMedicalChange('place')
            }
          />

          <FormField
            label="Detalle"
            type="text"
            value={
              medicalFormData.description
            }
            placeholder="Descripción del registro"
            onChange={
              handleMedicalChange(
                'description'
              )
            }
          />

          {formError && (
            <p role="alert">
              {formError}
            </p>
          )}

          <div className="medical-history-page__form-actions">

            <Button
              variant="primary"
              disabled={saving}
              onClick={
                handleSaveMedicalRecord
              }
            >
              {saving
                ? 'Guardando…'
                : editingRecordId !== null
                  ? 'Guardar cambios'
                  : 'Guardar registro'}
            </Button>

            <Button
              variant="secondary"
              onClick={
                handleCloseMedicalForm
              }
            >
              Cancelar
            </Button>

          </div>

        </section>

      )}

      <section className="medical-history-page__records">

        {loading && (
          <div className="medical-history-page__empty">
            <p>Cargando historial médico…</p>
          </div>
        )}

        {!loading && error && (
          <div className="medical-history-page__empty">
            <h3>No se pudo cargar</h3>
            <p role="alert">{error}</p>
          </div>
        )}

        {!loading &&
          !error &&
          visibleRecords.length === 0 && (

          <div className="medical-history-page__empty">

            <span aria-hidden="true">
              🩺
            </span>

            <h3>
              No hay registros en esta categoría
            </h3>

            <p>
              Puedes agregar el primer registro
              médico de esta categoría.
            </p>

          </div>

        )}

        {!loading &&
          !error &&
          visibleRecords.map(
          (record) => (
            <MedicalRecordCard
              key={record.id}
              type={record.type}
              title={record.title}
              date={record.date}
              place={record.place}
              description={
                record.description
              }
              onClick={() =>
                handleOpenEditRecord(
                  record
                )
              }
            />
          )
        )}

      </section>

    </main>
  );
}

export default MedicalHistoryPage;
