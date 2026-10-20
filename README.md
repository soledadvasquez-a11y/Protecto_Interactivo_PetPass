# [PetPass]

## 1. Identificación

**Asignatura:** Taller de Proyectos Interactivos  
**Carrera:** Ingeniería Multimedia e Interactividad Digital  
**Periodo:** 2/2026  
**Equipo:** Gatos

### Integrantes y accountabilities Scrum

| Integrante | Accountability Scrum | Responsabilidad inicial en el equipo |
|---|---|---|
| [Heidy Quispe] | Product Owner | [Completar] |
| [Daniel Gutierres] | Scrum Master | [Completar] |
| [Soledad Vasquez] | Developer | [Completar] |

> En Scrum, Product Owner, Scrum Master y Developers forman parte del mismo Scrum Team. En este proyecto académico, los tres integrantes participarán también en la construcción técnica del producto.

---

## 2. Problema

En La Paz, nuestras mascotas son parte vital de la familia, pero la ciudad carece de una red centralizada y empática para su cuidado. Cuando un animalito se extravía, la angustia y desesperación de los tutores es inmensa; no existe una herramienta comunitaria rápida que canalice la solidaridad ciudadana para lograr un reencuentro seguro. Además, el día a día se complica al no tener acceso rápido a información confiable sobre emergencias veterinarias o espacios urbanos donde nuestros compañeros de cuatro patas sean bienvenidos.
---

## 3. Usuario principal

Familias paceñas y tutores de mascotas que buscan brindar la mejor calidad de vida y seguridad a sus compañeros. 

**Usuarios o actores secundarios:**  
 - Clínicas y Servicios Veterinarios de Emergencia: Establecimientos de salud animal que forman parte del mapa geolocalizado para ofrecer asistencia rápida a los tutores cuando más lo necesitan.
 - Locales y Espacios Pet-Friendly (cafés, parques, plazas): Espacios urbanos y comercios en La Paz que aceptan mascotas y se benefician al visibilizarse en la app para recibir a la comunidad.
 - Dueños de mascotas: que necesitan una aydua al momento de perder su mascota. Tambien que busquen lugares Pet-Friendly para poder salir.

---

## 4. Objetivo / resultado esperado

Transformar a La Paz en una comunidad solidaria que proteja a sus animales, facilitando una tenencia responsable y amorosa. Lograremos esto centralizando la información en una plataforma interactiva que conecte la identidad digital de la mascota con un sistema ciudadano de rescate rápido (GPS Social) y un mapa de servicios y espacios amigables.

---

## 5. Valor esperado

Reducción del tiempo de notificación en caso de pérdida de una mascota mediante alertas automatizadas y precisas. Adicionalmente, el usuario obtendrá mayor tranquilidad, facilidad y confiabilidad para encontrar espacios pet-friendly verificados en la ciudad.

---
## 6. Product Goal

Convertir a PetPass en la principal red de identidad digital y seguridad colaborativa para mascotas en La Paz, garantizando rescates rápidos mediante "GPS Social" y fomentando una tenencia responsable e informada.

**Criterio de revisión:**  
- ¿Expresa una dirección de producto?
Sí, define con claridad que el producto se encamina a ser la red de protección, identidad y comunidad para mascotas en La Paz.
-¿Está orientado a valor?
Sí, su foco no es la tecnología por sí sola, sino la tranquilidad familiar, el reencuentro rápido y la convivencia responsable.
-¿Evita enumerar funcionalidades?
Sí, no menciona botones, menús ni bases de datos; se enfoca en el propósito y el impacto en la vida real.
-¿Permite que las funcionalidades evolucionen sin perder el objetivo?
Sí, en el futuro la app podría incluir recordatorios de vacunas, adopciones o historial médico, y el Product Goal seguirá siendo plenamente válido.

## 7. Producto / MVP preliminar

El MVP será una aplicación móvil interactiva (proyectada en React Native) que digitaliza la identidad de la mascota. El flujo principal consiste en que, al escanear el carnet QR de un animal perdido, el sistema solicita permisos, captura las coordenadas del celular de quien escanea y muestra esta ubicación en el mapa interactivo del dueño.

### Incluye inicialmente
- Módulo de registro de perfiles de mascotas con generación automática de carnet digital y código QR único.
- Flujo de rescate "GPS Social": Escaneo de QR mediante la cámara móvil que solicita permisos de geolocalización nativa y envía las coordenadas al tutor.
- Mapa interactivo con puntos de interés verificados (veterinarias/emergencias 24h y parques o espacios pet-friendly).

### No incluye inicialmente
- Dispositivos de hardware o collares con rastreo GPS físico incorporado
- Módulo de comercio electrónico (tienda en línea) o pasarelas de cobro/pago.

---

## 8. Enfoque de trabajo

**Enfoque predominante:** Ágil / adaptativo  
**Framework de trabajo:** Scrum  
**Forma de desarrollo:** Iterativa e incremental

### Justificación

El proyecto exige un enfoque ágil debido a la necesidad crítica de obtener feedback temprano sobre la usabilidad de la interfaz en pantallas táctiles móviles. Además, se requiere probar en entornos reales (y de forma temprana) el flujo complejo de captura de coordenadas y escáner de cámara. Esto permite iterar el diseño y adaptar la solución a los permisos de los sistemas operativos (Android/iOS) sin afectar el núcleo del código, garantizando entregar un producto funcional al finalizar el semestre académico.

---

## 9. Evidencias iniciales

- [x] Ficha Inicial del Proyecto – Versión 0.1
- [x] Matriz de selección de ideas y enfoque
- [x] Product Goal aprobado por el equipo
- [x] Scrum Team identificado
- [x] Repositorio GitHub creado
- [ ] GitHub Project configurado

---

## 10. Referencias de trabajo

- Scrum Guide 2020 – Ken Schwaber y Jeff Sutherland: https://scrumguides.org/download
- PMI – A Spectrum of Approaches: https://www.pmi.org/learning/thought-leadership/series/achieving-greater-agility/spectrum-of-approaches
- PMI – Agile Practice Guide, Second Edition: https://www.pmi.org/standards/agile

---

## 11. Historial del documento

| Versión | Fecha | Cambio principal |
|---|---|---|
| 0.1 | [10/09/2026] | Definición inicial del proyecto |
