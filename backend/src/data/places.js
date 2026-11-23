const places = [
  {
    id: 1,
    category: 'park',
    type: 'park',
    name: 'Parque Snoopy',
    address:
      'Av. Julio César Valdez, esq. Pacajes',
    schedule:
      'Lunes a Domingo: 07:00 – 19:00',
    description:
      'Área verde cercada con zonas de agilidad, bebederos caninos y dispensadores de bolsas biodegradables. Entrada libre con correa obligatoria.',
    photo: '/places/place-snoopy.svg',
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
    address:
      'Av. Tiahuanacu, esq. Pacajes',
    schedule:
      'Lunes a Domingo: 24 horas',
    description:
      'Clínica veterinaria integral con servicio de urgencias, laboratorio clínico, rayos X y farmacia especializada.',
    photo: '/places/place-sanjorge.svg',
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
    address:
      'Av. Julio César Valdez, Plaza El Minero',
    schedule:
      'Lunes a Sábado: 08:30 – 19:30',
    description:
      'Centro de salud animal especializado en medicina preventiva, vacunación, desparasitación y cirugías menores.',
    photo: '/places/place-apolo.svg',
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
    address:
      'Av. Julio César Valdez, próx. Plaza Pacajes',
    schedule:
      'Martes a Domingo: 08:30 – 21:00',
    description:
      'Café con terraza al aire libre adaptada para mascotas, bebederos y espacio cómodo para compartir.',
    photo: '/places/place-paladrar.svg',
    position: {
      top: '44%',
      left: '60%',
    },
  },

{
  id: 5,
  category: 'park',
  type: 'park',
  name: 'Plaza Abaroa',
  address: 'Sopocachi, La Paz, Bolivia',
  schedule: null,
  description:
    'Plaza pública de Sopocachi. Consulta las normas vigentes para visitar sus áreas con mascotas.',
  photo: null,

  // Compatibilidad con el mapa ilustrado de PetPass Web.
  position: {
    top: '57%',
    left: '42%',
  },

  // Ubicación geográfica para PetPass Mobile.
  latitude: -16.51062,
  longitude: -68.12672,
  verified: 1,
},

  {
    id: 6,
    category: 'veterinary',
    type: 'veterinary',
    name: 'Clínica Veterinaria Miraflores',
    address:
      'Av. Busch, Miraflores',
    schedule:
      'Lunes a Sábado: 08:00 – 20:00',
    description:
      'Centro veterinario de demostración con consulta general, vacunación y atención preventiva.',
    photo: null,
    position: {
      top: '22%',
      left: '45%',
    },
  },
  {
    id: 7,
    category: 'petFriendly',
    type: 'petFriendly',
    name: 'Café Patitas',
    address:
      'Calle 21 de Calacoto, Zona Sur',
    schedule:
      'Martes a Domingo: 09:00 – 21:30',
    description:
      'Espacio de demostración pet-friendly con terraza, bebederos y mesas exteriores.',
    photo: null,
    position: {
      top: '68%',
      left: '72%',
    },
  },
  {
    id: 8,
    category: 'park',
    type: 'park',
    name: 'Parque Costanera Mascotas',
    address:
      'Av. Costanera, Zona Sur',
    schedule:
      'Lunes a Domingo: 07:00 – 19:30',
    description:
      'Área recreativa de demostración para caminatas, descanso y socialización responsable de mascotas.',
    photo: null,
    position: {
      top: '70%',
      left: '28%',
    },
  },
];



// =====================================================
// PARTE 7 - LUGARES CON UBICACIÓN GPS
// Se utilizan en el mapa interactivo de PetPass Mobile.
// position vacío evita dibujarlos en el SVG de PetPass Web.
// =====================================================

places.push(
  {
    id: 9,
    category: 'park',
    type: 'park',
    name: 'Plaza Bolivia',
    address: 'Avenida Arce, La Paz, Bolivia',
    schedule: null,
    description:
      'Plaza pública de La Paz. Consultar las normas vigentes para visitar sus áreas con mascotas.',
    photo: null,
    position: {},
    latitude: -16.50693,
    longitude: -68.12666,
    verified: 1,
  },
  {
    id: 10,
    category: 'park',
    type: 'park',
    name: 'Parque Mirador Laikakota',
    address: 'Avenida del Ejército, La Paz, Bolivia',
    schedule: null,
    description:
      'Parque mirador de La Paz. Consultar horarios y condiciones de ingreso antes de visitarlo.',
    photo: null,
    position: {},
    latitude: -16.50320,
    longitude: -68.12422,
    verified: 1,
  },
  {
    id: 11,
    category: 'veterinary',
    type: 'veterinary',
    name: 'SemeVet',
    address:
      'Calle República de Cuba 1836, Miraflores, La Paz, Bolivia',
    schedule: null,
    description:
      'Hospital veterinario en Miraflores. Confirmar disponibilidad y servicios antes de acudir.',
    photo: null,
    position: {},
    latitude: -16.50072,
    longitude: -68.12016,
    verified: 1,
  },
  {
    id: 12,
    category: 'veterinary',
    type: 'veterinary',
    name: 'Clínica Veterinaria Hocico Spa',
    address:
      'Avenida Ecuador 2434, Sopocachi, La Paz, Bolivia',
    schedule: null,
    description:
      'Establecimiento veterinario de Sopocachi. Consultar directamente sus servicios y horarios.',
    photo: null,
    position: {},
    latitude: -16.51166,
    longitude: -68.12928,
    verified: 1,
  },
  {
    id: 13,
    category: 'petFriendly',
    type: 'petFriendly',
    name: 'Amanita Café Market',
    address:
      'Avenida Germán Busch 1689, Miraflores, La Paz, Bolivia',
    schedule: null,
    description:
      'Cafetería presentada como pet-friendly. Confirmar las condiciones de ingreso con mascotas.',
    photo: null,
    position: {},
    latitude: -16.49888,
    longitude: -68.12100,
    verified: 1,
  }
)
export default places