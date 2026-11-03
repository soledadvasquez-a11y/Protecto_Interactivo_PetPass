import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import FilterTab from '../components/FilterTab/FilterTab.jsx';
import MedicalRecordCard from '../components/MedicalRecordCard/MedicalRecordCard.jsx';

import medicalRecords from '../data/medicalRecords.js';

import './MedicalHistoryPage.css';

function MedicalHistoryPage() {
  const { id } = useParams();

  const [activeFilter, setActiveFilter] =
    useState('vaccine');

  const petId = Number(id);

  /*
    Primero obtenemos solamente los registros
    pertenecientes a la mascota de la URL.
  */
  const petRecords = useMemo(
    () =>
      medicalRecords.filter(
        (record) => record.petId === petId
      ),
    [petId]
  );

  /*
    Después filtramos los registros de esa
    mascota por vacuna, desparasitación o consulta.
  */
  const visibleRecords = useMemo(
    () =>
      petRecords.filter(
        (record) => record.type === activeFilter
      ),
    [petRecords, activeFilter]
  );

  return (
    <main className="page medical-history-page">
      <header className="medical-history-page__heading">
        <h1>Historial médico</h1>

        <p>
          Consulta los registros de salud de tu mascota.
        </p>
      </header>

      <div className="medical-history-page__filters">
        <FilterTab
          label="Vacunas"
          active={activeFilter === 'vaccine'}
          onClick={() =>
            setActiveFilter('vaccine')
          }
        />

        <FilterTab
          label="Desparasitación"
          active={activeFilter === 'deworming'}
          onClick={() =>
            setActiveFilter('deworming')
          }
        />

        <FilterTab
          label="Consultas"
          active={activeFilter === 'consultation'}
          onClick={() =>
            setActiveFilter('consultation')
          }
        />
      </div>

      <section className="medical-history-page__records">
        {visibleRecords.map((record) => (
          <MedicalRecordCard
            key={record.id}
            type={record.type}
            title={record.title}
            date={record.date}
            place={record.place}
            description={record.description}
            onClick={() =>
              alert(`Abrir: ${record.title}`)
            }
          />
        ))}
      </section>
    </main>
  );
}

export default MedicalHistoryPage;