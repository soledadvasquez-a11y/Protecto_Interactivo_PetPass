# PetPass La Paz

PetPass La Paz es una aplicación web para tutores de mascotas que centraliza perfiles, historial médico, alertas comunitarias y lugares relacionados con el cuidado animal, integrando frontend, API REST y persistencia SQLite.

## 1. Identificación

**Asignatura:** Taller de Proyectos Interactivos  
**Carrera:** Ingeniería Multimedia e Interactividad Digital  
**Periodo:** 2/2026  
**Equipo:** Gatos

### Equipo y aportes

| Integrante | Cuenta GitHub | Accountability Scrum | Principales aportes técnicos |
|---|---|---|---|
| Heidy Quispe | HeidyCamila | Product Owner | Componentes de interfaz y páginas de mascotas; M5 de mascotas; M6 de historial y lugares; validaciones de API y proxy de Vite; integración frontend-backend; CRUD de mascotas; esquema y persistencia SQLite de `pets`; reglas de negocio de alertas y revisión final. |
| Daniel Gutierrez | dani4773 | Scrum Master | Componentes agrupados y páginas de comunidad; flujos M5; backend inicial con Express; endpoints de mascotas e historial médico; correcciones EC2 y datos demo; esquema SQLite de alertas y persistencia de alertas/lugares. |
| Soledad Vasquez | soledadvasquez-a11y | Developer | Páginas iniciales e historial médico; M5 de comunidad; M6 de alertas; integración de mascotas, alertas y mapa con la API; actualización de documentación; esquema y persistencia SQLite de historial/lugares; integridad referencial y cierre final de SQLite. |

> En Scrum, Product Owner, Scrum Master y Developers forman parte del mismo Scrum Team. En este proyecto académico, los tres integrantes participaron también en la construcción técnica del producto. El historial del repositorio conserva ramas y commits de las distintas fases de trabajo; algunas ramas tuvieron participación compartida.

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
- **¿Expresa una dirección de producto?** Sí. Define que el producto busca convertirse en una plataforma de protección, identidad y comunidad para mascotas en La Paz.
- **¿Está orientado a valor?** Sí. Su foco está en la tranquilidad de los tutores, la seguridad de las mascotas y la convivencia responsable.
- **¿Evita enumerar funcionalidades?** Sí. Se enfoca en el propósito y el impacto del producto.
- **¿Permite que las funcionalidades evolucionen sin perder el objetivo?** Sí. PetPass puede incorporar nuevas herramientas manteniendo su propósito principal.

---

## 7. Producto / MVP actual

PetPass La Paz es una aplicación web orientada a tutores de mascotas que centraliza información básica de sus animales, historial médico, alertas comunitarias y lugares relacionados con el cuidado de mascotas.

El MVP está desarrollado con React y Vite en el frontend y Node.js con Express en el backend. La aplicación consume una API REST conectada a una base de datos SQLite, que permite almacenar y gestionar la información de mascotas, registros médicos, alertas y lugares.

La integración de SQLite permite que los datos creados o modificados mediante la API permanezcan almacenados incluso después de reiniciar el servidor.

### Funcionalidades del MVP
- **Gestión de mascotas:** registro y administración de perfiles de animales.
- **Carnet digital:** visualización de información identificativa de las mascotas.
- **Historial médico:** consulta y gestión de registros relacionados con la salud de los animales.
- **Alertas comunitarias:** gestión de información sobre mascotas extraviadas y otras alertas comunitarias.
- **Lugares:** consulta de espacios y establecimientos relacionados con el cuidado de mascotas.

### Alcance y limitaciones
El MVP actual incorpora persistencia de datos mediante SQLite en el backend y utiliza información de demostración para inicializar las tablas cuando se crea una base de datos vacía.

La aplicación no incluye:
- Dispositivos físicos o collares con rastreo GPS incorporado.
- Comercio electrónico o pasarelas de pago.
- Integración con dispositivos externos de geolocalización.

---

## 8. Enfoque de trabajo

**Enfoque predominante:** Ágil / adaptativo  
**Framework de trabajo:** Scrum  
**Forma de desarrollo:** Iterativa e incremental.

### Justificación
El proyecto utiliza un enfoque ágil porque permite desarrollar, probar y mejorar progresivamente las funcionalidades de PetPass.

Durante el desarrollo se trabajó en la construcción de interfaces con React, la implementación de una API REST con Express, la integración entre frontend y backend y la incorporación de persistencia de datos mediante SQLite.

La organización mediante Scrum permite distribuir responsabilidades, revisar los avances y adaptar el producto según las necesidades identificadas durante las diferentes etapas del proyecto.

---

## 9. Tecnologías utilizadas

### Frontend
- React
- Vite
- JavaScript
- CSS

### Backend
- Node.js 22.5 o superior
- Express
- API REST
- SQLite mediante el módulo integrado `node:sqlite`

### Base de datos
- SQLite
- Claves primarias y foráneas
- Consultas SQL parametrizadas
- Restricciones de integridad referencial

### Herramientas de desarrollo
- Git
- GitHub
- Visual Studio Code
- npm

---

## 10. Arquitectura actual

PetPass utiliza una arquitectura cliente-servidor en el que el frontend se comunica con el backend mediante una API REST. El backend gestiona las solicitudes y realiza las operaciones de lectura y escritura directamente sobre la base de datos SQLite.

### Flujo de arquitectura

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
         Controladores API
                |
                v
             SQLite
          (petpass.db)