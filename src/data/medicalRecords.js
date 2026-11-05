const medicalRecords = [
  {
    id: 1,
    petId: 1,
    type: 'vaccine',
    title: 'Vacuna antirrábica',
    date: '2026-09-12',
    nextDate: '2027-09-12',
    place: 'Veterinaria Central',
    description: 'Aplicación anual de vacuna antirrábica.',
  },
  {
    id: 2,
    petId: 1,
    type: 'deworming',
    title: 'Desparasitación interna',
    date: '2026-08-20',
    nextDate: '2026-11-20',
    place: 'PetCare La Paz',
    description: 'Control preventivo y antiparasitario.',
  },
  {
    id: 3,
    petId: 1,
    type: 'consultation',
    title: 'Consulta general',
    date: '2026-10-05',
    nextDate: '',
    place: 'Clínica Veterinaria Sur',
    description: 'Control general. Mascota en buen estado.',
  },
  {
    id: 4,
    petId: 2,
    type: 'vaccine',
    title: 'Vacuna triple felina',
    date: '2026-07-18',
    nextDate: '2027-07-18',
    place: 'Veterinaria Central',
    description: 'Aplicación anual de vacuna triple felina.',
  },
];

export default medicalRecords;