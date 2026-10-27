import { useMemo, useState } from 'react';

import FilterTab from '../components/FilterTab/FilterTab.jsx';
import MedicalRecordCard from '../components/MedicalRecordCard/MedicalRecordCard.jsx';

import './MedicalHistoryPage.css';

const records = [
  {
    id: 1,
    type: 'vaccine',
    title: 'Vacuna antirrábica',
    date: '12/09/2026',
    place: 'Veterinaria Central',
    description: 'Aplicación anual de vacuna antirrábica.',
  },
  {
    id: 2,
    type: 'deworming',
    title: 'Desparasitación interna',
    date: '20/08/2026',
    place: 'PetCare La Paz',
    description: 'Control preventivo y antiparasitario.',
  },
  {
    id: 3,
    type: 'consultation',
    title: 'Consulta general',
    date: '05/10/2026',
    place: 'Clínica Veterinaria Sur',
    description: 'Control general. Mascota en buen estado.',
  },
];

function MedicalHistoryPage() {
  const [activeFilter, setActiveFilter] = useState('vaccine');

  const visibleRecords = useMemo(
    () =>
      records.filter(
        (record) => record.type === activeFilter
      ),
    [activeFilter]
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
          onClick={() => setActiveFilter('vaccine')}
        />

        <FilterTab
          label="Desparasitación"
          active={activeFilter === 'deworming'}
          onClick={() => setActiveFilter('deworming')}
        />

        <FilterTab
          label="Consultas"
          active={activeFilter === 'consultation'}
          onClick={() => setActiveFilter('consultation')}
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