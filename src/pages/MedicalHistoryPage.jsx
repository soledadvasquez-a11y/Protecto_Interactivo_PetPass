import {
  useMemo,
  useState,
} from 'react';

import { useParams } from 'react-router-dom';

import FilterTab from '../components/FilterTab/FilterTab.jsx';
import MedicalRecordCard from '../components/MedicalRecordCard/MedicalRecordCard.jsx';
import FormField from '../components/FormField/FormField.jsx';
import Button from '../components/Button/Button.jsx';

import initialMedicalRecords from '../data/medicalRecords.js';

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

function MedicalHistoryPage({
  medicalRecords = initialMedicalRecords,
  onAddMedicalRecord,
  onUpdateMedicalRecord,
}) {
  const { id } = useParams();

  const petId = Number(id);

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

  const petRecords = useMemo(
    () =>
      medicalRecords.filter(
        (record) =>
          record.petId === petId
      ),
    [medicalRecords, petId]
  );

  const visibleRecords = useMemo(
    () =>
      petRecords.filter(
        (record) =>
          record.type === activeFilter
      ),
    [petRecords, activeFilter]
  );

  const handleMedicalChange =
    (field) => (event) => {
      setMedicalFormData((current) => ({
        ...current,
        [field]: event.target.value,
      }));
    };

  const handleOpenNewRecord = () => {
    setMedicalFormData({
      ...EMPTY_MEDICAL_FORM,
      type: activeFilter,
    });

    setEditingRecordId(null);
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
    setMedicalFormOpen(true);
  };

  const handleCloseMedicalForm = () => {
    setMedicalFormOpen(false);

    setMedicalFormData(
      EMPTY_MEDICAL_FORM
    );

    setEditingRecordId(null);
  };

  const handleSaveMedicalRecord = () => {
    if (
      !medicalFormData.title.trim() ||
      !medicalFormData.date
    ) {
      return;
    }

    if (editingRecordId !== null) {
      const updatedRecord = {
        id: editingRecordId,
        petId,
        ...medicalFormData,
      };

      if (onUpdateMedicalRecord) {
        onUpdateMedicalRecord(
          updatedRecord
        );
      }
    } else {
      const newRecord = {
        id: Date.now(),
        petId,
        ...medicalFormData,
      };

      if (onAddMedicalRecord) {
        onAddMedicalRecord(
          newRecord
        );
      }
    }

    setActiveFilter(
      medicalFormData.type
    );

    handleCloseMedicalForm();
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

          <div className="medical-history-page__form-actions">

            <Button
              variant="primary"
              onClick={
                handleSaveMedicalRecord
              }
            >
              {editingRecordId !== null
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

        {visibleRecords.length === 0 && (

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

        {visibleRecords.map(
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