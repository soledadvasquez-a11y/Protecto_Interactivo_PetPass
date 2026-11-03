import placeApolo from '../assets/place-apolo.svg';
import placePaladrar from '../assets/place-paladrar.svg';
import placeSanJorge from '../assets/place-sanjorge.svg';
import placeSnoopy from '../assets/place-snoopy.svg';

const places = [
  {
    id: 1,
    category: 'park',
    type: 'petFriendly',
    name: 'Parque ...',
    address: 'La Paz',
    schedule: 'Abierto',
    description: 'Espacio para pasear con mascotas.',
    photo: placeApolo,
    position: { x: 30, y: 35 },
  },
  // Normalizar el resto con category: veterinary | park | petFriendly
];

export default places;