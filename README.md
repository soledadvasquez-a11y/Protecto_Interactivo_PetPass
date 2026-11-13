# PetPass La Paz

## 1. Identificación

**Asignatura:** Taller de Proyectos Interactivos  
**Carrera:** Ingeniería Multimedia e Interactividad Digital  
**Periodo:** 2/2026  
**Equipo:** Gatos

### Integrantes y accountabilities Scrum

| Integrante | Accountability Scrum | Principales aportes al proyecto |
|---|---|---|
| Heidy Quispe | Product Owner | Validaciones de API, configuración del proxy de Vite, historial médico, lugares, integración frontend-backend, CRUD de mascotas y revisión final del proyecto. |
| Daniel Gutierrez | Scrum Master | Configuración inicial del backend con Express, desarrollo de endpoints iniciales de mascotas e historial médico y desarrollo de flujos principales. |
| Soledad Vasquez | Developer | Desarrollo de la API de alertas, integración de mascotas, desarrollo de HomePage y DigitalCardPage y conexión de funcionalidades con la API. |

> En Scrum, Product Owner, Scrum Master y Developers forman parte del mismo Scrum Team. En este proyecto académico, los tres integrantes participan también en la construcción técnica del producto.

---

## 2. Problema

En La Paz, nuestras mascotas son parte vital de la familia, pero la ciudad carece de una red centralizada y accesible para su cuidado. Cuando un animalito se extravía, la angustia y desesperación de los tutores es inmensa; por ello, se necesita una herramienta comunitaria que facilite la difusión de alertas y contribuya a lograr un reencuentro seguro.

Además, el día a día puede complicarse al no contar con acceso rápido y organizado a información sobre la salud de las mascotas, servicios veterinarios y espacios urbanos donde nuestros compañeros de cuatro patas sean bienvenidos.

---

## 3. Usuario principal

Familias paceñas y tutores de mascotas que buscan brindar una mejor calidad de vida, seguridad y cuidado responsable a sus animales.

**Usuarios o actores secundarios:**

- **Clínicas y servicios veterinarios:** establecimientos relacionados con la salud animal que pueden ser consultados por los tutores.
- **Locales y espacios Pet-Friendly:** cafeterías, parques, plazas y otros espacios urbanos que aceptan mascotas.
- **Personas de la comunidad:** ciudadanos que pueden consultar y compartir alertas relacionadas con mascotas extraviadas.

---

## 4. Objetivo / resultado esperado

Transformar a La Paz en una comunidad solidaria que proteja a sus animales, facilitando una tenencia responsable y amorosa. Para ello, PetPass centraliza información de las mascotas y conecta a sus tutores con herramientas digitales relacionadas con su cuidado, seguridad y bienestar.

---

## 5. Valor esperado

Facilitar la organización de la información de las mascotas y mejorar el acceso a herramientas de comunicación comunitaria en caso de extravío. Adicionalmente, brindar a los tutores mayor comodidad para consultar registros médicos y encontrar lugares relacionados con el cuidado de sus animales.

---

## 6. Product Goal

Convertir a PetPass en una red de identidad digital y seguridad colaborativa para mascotas en La Paz, promoviendo una tenencia responsable, informada y solidaria.

**Criterio de revisión:**

- **¿Expresa una dirección de producto?**

Sí, define con claridad que el producto busca convertirse en una plataforma de protección, identidad y comunidad para mascotas en La Paz.

- **¿Está orientado a valor?**

Sí, su foco está en la tranquilidad de los tutores, la seguridad de las mascotas y la convivencia responsable.

- **¿Evita enumerar funcionalidades?**

Sí, se enfoca en el propósito y el impacto del producto, sin depender de funcionalidades específicas.

- **¿Permite que las funcionalidades evolucionen sin perder el objetivo?**

Sí, en el futuro PetPass podrá incorporar nuevas herramientas como recordatorios de vacunas, adopciones y otras funcionalidades relacionadas con el bienestar animal, manteniendo su propósito principal.

---

## 7. Producto / MVP actual

PetPass La Paz es una aplicación web orientada a tutores de mascotas que centraliza información básica de sus animales, historial médico, alertas comunitarias y lugares relacionados con el cuidado de mascotas.

El MVP actual está desarrollado con React y Vite en el frontend y Node.js con Express en el backend. La aplicación consume una API REST para gestionar mascotas, registros médicos, alertas y lugares.

Actualmente, los datos de demostración son gestionados temporalmente desde el backend. La siguiente fase del proyecto incorporará persistencia mediante una base de datos SQLite.

### Funcionalidades del MVP

- **Gestión de mascotas:** registro y administración de perfiles de animales.
- **Carnet digital:** visualización de información identificativa de las mascotas.
- **Historial médico:** consulta y gestión de registros relacionados con la salud de los animales.
- **Alertas comunitarias:** gestión de información sobre mascotas extraviadas.
- **Lugares:** consulta de espacios y establecimientos relacionados con el cuidado de mascotas.

### Alcance y limitaciones

El MVP actual utiliza datos de demostración administrados desde el backend. La persistencia permanente mediante una base de datos todavía no forma parte de esta versión.

No incluye:

- Dispositivos físicos o collares con rastreo GPS incorporado.
- Comercio electrónico o pasarelas de pago.
- Persistencia de información mediante SQLite en la versión actual.

---

## 8. Enfoque de trabajo

**Enfoque predominante:** Ágil / adaptativo  
**Framework de trabajo:** Scrum  
**Forma de desarrollo:** Iterativa e incremental.

### Justificación

El proyecto utiliza un enfoque ágil porque permite desarrollar, probar y mejorar progresivamente las funcionalidades de PetPass.

Durante el desarrollo se trabajó en la construcción de interfaces con React, la implementación de una API REST con Express y la integración entre frontend y backend.

La organización mediante Scrum permite distribuir responsabilidades, revisar los avances y adaptar el producto según las necesidades identificadas durante las diferentes etapas del proyecto.

---

## 9. Tecnologías utilizadas

### Frontend

- React
- Vite
- JavaScript
- CSS

### Backend

- Node.js
- Express
- API REST

### Herramientas de desarrollo

- Git
- GitHub
- Visual Studio Code

### Persistencia

- **Estado actual:** datos de demostración administrados temporalmente desde el backend.
- **Siguiente fase:** incorporación de SQLite para implementar persistencia de datos.

---

## 10. Arquitectura actual

La arquitectura actual de PetPass utiliza una separación entre frontend y backend mediante una API REST.

```text
        React + Vite
             |
             v
          /api/*
             |
             v
      Node.js + Express
             |
             v
       Datos demo del
          backend
```

Los principales recursos gestionados mediante la API son:

- Mascotas.
- Historial médico.
- Alertas.
- Lugares.

Actualmente, el backend administra temporalmente los datos de demostración mediante estructuras JavaScript.

La siguiente fase reemplazará el almacenamiento temporal del backend por SQLite, manteniendo las rutas actuales de la API para conservar la integración con el frontend.

---

## 11. Cómo ejecutar el proyecto

### Requisitos

Tener instalado:

- Node.js
- npm
- Git

### 1. Clonar el repositorio

```bash
git clone https://github.com/soledadvasquez-a11y/Protecto_Interactivo_PetPass.git
```

Entrar al proyecto:

```bash
cd Protecto_Interactivo_PetPass
```

### 2. Instalar dependencias del frontend

Desde la raíz del proyecto:

```bash
npm install
```

### 3. Instalar dependencias del backend

Ingresar a la carpeta backend:

```bash
cd backend
```

Instalar las dependencias:

```bash
npm install
```

Después, volver a la raíz del proyecto:

```bash
cd ..
```

### 4. Ejecutar el backend

Desde una terminal:

```bash
cd backend
npm run dev
```

El servidor backend se ejecuta en:

http://localhost:3000

Para verificar su funcionamiento, acceder a:

http://localhost:3000/api/health

Respuesta esperada:

```json
{
  "status": "ok"
}
```

### 5. Ejecutar el frontend

Abrir otra terminal desde la raíz del proyecto:

```bash
npm run dev
```

Vite mostrará la dirección local de la aplicación, normalmente:

http://localhost:5173

El frontend utiliza el proxy de Vite para enviar las solicitudes que comienzan con `/api/*` al backend:

http://localhost:3000

### Importante

Para utilizar las funcionalidades integradas de PetPass, deben estar ejecutándose simultáneamente:

- El servidor frontend (React + Vite).
- El servidor backend (Node.js + Express).

---

## 12. Evidencias del proyecto

- [x] Ficha Inicial del Proyecto – Versión 0.1.
- [x] Matriz de selección de ideas y enfoque.
- [x] Product Goal aprobado por el equipo.
- [x] Scrum Team identificado.
- [x] Repositorio GitHub creado.
- [ ] GitHub Project configurado.

---

## 13. Referencias de trabajo

- Scrum Guide 2020 – Ken Schwaber y Jeff Sutherland: https://scrumguides.org/download
- PMI – A Spectrum of Approaches: https://www.pmi.org/learning/thought-leadership/series/achieving-greater-agility/spectrum-of-approaches
- PMI – Agile Practice Guide, Second Edition: https://www.pmi.org/standards/agile

---

## 14. Historial del documento

| Versión | Fecha | Cambio principal |
|---|---|---|
| 0.1 | 10/09/2026 | Definición inicial del proyecto. |
| 0.2 | 12/11/2026 | Actualización del MVP, tecnologías, arquitectura, integrantes e instrucciones de ejecución del proyecto. |
