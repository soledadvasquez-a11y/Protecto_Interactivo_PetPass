import placeSnoopy from '../assets/place-snoopy.svg';
import placeSanJorge from '../assets/place-sanjorge.svg';
import placeApolo from '../assets/place-apolo.svg';
import placePaladrar from '../assets/place-paladrar.svg';

const places = [
  {
    id: 1,
    category: 'park',
    type: 'park',
    name: 'Parque Snoopy',
    address: 'Av. Julio César Valdez, esq. Pacajes',
    schedule: 'Lunes a Domingo: 07:00 – 19:00',
    description:
      'Área verde cercada con zonas de agilidad, bebederos caninos y dispensadores de bolsas biodegradables. Entrada libre con correa obligatoria.',
    photo: placeSnoopy,
    position: {
      top: '38%',
      left: '32%',
    },
  },
  {
    id: 2,
    category: 'veterinary',
    type: 'veterinary',
    name: 'Veterinaria San Jorge',
    address: 'Av. Tiahuanacu, esq. Pacajes',
    schedule: 'Lunes a Domingo: 24 horas',
    description:
      'Clínica veterinaria integral con servicio de urgencias, laboratorio clínico, rayos X y farmacia especializada. Atención profesional para caninos y felinos.',
    photo: placeSanJorge,
    position: {
      top: '28%',
      left: '68%',
    },
  },
  {
    id: 3,
    category: 'veterinary',
    type: 'veterinary',
    name: 'Veterinaria Apolo',
    address: 'Av. Julio César Valdez, Plaza El Minero',
    schedule: 'Lunes a Sábado: 08:30 – 19:30',
    description:
      'Centro de salud animal especializado en medicina preventiva, planes de vacunación, desparasitación, peluquería canina y cirugías menores programadas.',
    photo: placeApolo,
    position: {
      top: '48%',
      left: '24%',
    },
  },
  {
    id: 4,
    category: 'petFriendly',
    type: 'petFriendly',
    name: 'Paladrar',
    address: 'Av. Julio César Valdez, próx. Plaza Pacajes',
    schedule: 'Martes a Domingo: 08:30 – 21:00',
    description:
      'Café de especialidad y repostería artesanal con terraza al aire libre adaptada para mascotas. Ofrece bebederos limpios, galletas caninas de cortesía y espacio cómodo para compartir con tu peludo.',
    photo: placePaladrar,
    position: {
      top: '44%',
      left: '60%',
    },
  },
];

export default places;