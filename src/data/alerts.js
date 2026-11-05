import posterLost from '../assets/poster-lost.svg';
import posterEmergency from '../assets/poster-emergency.svg';

const alerts = [
  {
    id: 1,
    type: 'lost',
    petId: 1,
    petName: 'Toby',
    photo: posterLost,
    zone: 'sopocachi',
    location: 'Sopocachi, La Paz',
    date: 'Ayer',
    description:
      'Visto por última vez cerca de Plaza Abaroa.',
    contact: '',
    status: 'active',
  },
  {
    id: 2,
    type: 'emergency',
    petId: null,
    petName: 'Emergencia',
    photo: posterEmergency,
    zone: 'miraflores',
    location: 'Miraflores, La Paz',
    date: 'Hoy',
    description:
      'Se busca donante canino urgente para transfusión.',
    contact: '',
    status: 'active',
  },
  {
    id: 3,
    type: 'adoption',
    petId: null,
    petName: 'Luna',
    photo: null,
    zone: 'zona-sur',
    location: 'Zona Sur, La Paz',
    date: 'Hoy',
    description:
      'Luna busca una familia responsable. Es cariñosa y sociable.',
    contact: 'Contacto mediante PetPass',
    status: 'active',
  },
];

export default alerts;