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

Los principales recursos gestionados mediante la API son:
- Mascotas
- Historial médico
- Alertas
- Lugares

Los controladores utilizan consultas SQL parametrizadas para gestionar la información almacenada en SQLite.

Los datos de demostración ubicados en `backend/src/data/` se conservan como fuentes de inicialización (seeds), no como almacenamiento definitivo. Cuando se crea una base de datos vacía, `backend/src/db.js` utiliza estos datos para inicializar las tablas correspondientes.

La integración mantiene la separación entre frontend y backend mediante las rutas existentes de la API REST.

---

## 11. Base de datos y persistencia

PetPass utiliza SQLite en el backend mediante el módulo integrado `node:sqlite` de Node.js.

La base de datos local se crea en:
`backend/petpass.db`

Este archivo corresponde a la base de datos de desarrollo y está excluido del seguimiento de Git mediante la regla `*.db`.

### Tablas
La base de datos contiene cuatro tablas principales:
- **pets:** almacena la información de las mascotas.
- **medical_records:** almacena los registros del historial médico.
- **places:** almacena los lugares relacionados con el cuidado y bienestar de las mascotas.
- **alerts:** almacena las alertas comunitarias.

### Inicialización de datos
Los datos de demostración ubicados en `backend/src/data/` se conservan únicamente como seeds.

Al crear una base de datos vacía, `backend/src/db.js` carga los datos iniciales correspondientes a las tablas. La inicialización evita volver a insertar los datos demo cuando las tablas ya contienen registros.

### Operaciones de persistencia
Los controladores trabajan directamente con SQLite mediante consultas parametrizadas:
- `SELECT` para consultar información.
- `INSERT` para crear registros.
- `UPDATE` para modificar registros.
- `DELETE` para eliminar registros.

### Integridad referencial
La base de datos utiliza claves foráneas para mantener la relación entre las mascotas y sus registros asociados:
- `medical_records.petId → pets.id ON DELETE CASCADE`
- `alerts.petId → pets.id ON DELETE SET NULL`

Esto significa que:
- **CASCADE:** cuando se elimina una mascota, sus registros médicos asociados también se eliminan automáticamente.
- **SET NULL:** cuando se elimina una mascota, las alertas relacionadas permanecen almacenadas, pero su campo `petId` pasa a ser `NULL`.

Además, `db.js` habilita:
`PRAGMA foreign_keys = ON`

Y verifica la integridad referencial mediante:
`PRAGMA foreign_key_check`

Esta comprobación permite detectar relaciones inválidas entre las tablas.

### Persistencia de datos
Los cambios realizados mediante la API permanecen almacenados después de reiniciar el servidor backend.

La información no se pierde al detener y volver a iniciar la aplicación, ya que los registros se almacenan en el archivo SQLite local.

### Crear una base demo limpia en desarrollo
Para eliminar la base local y volver a inicializarla con los datos de demostración, ejecutar desde la raíz del proyecto:

    Remove-Item backend/petpass.db -ErrorAction SilentlyContinue
    cd backend
    node src/db.js

Este procedimiento está destinado al entorno de desarrollo y elimina los datos locales almacenados en la base antes de volver a crearla.

---

## 12. Flujo principal para el EC2

Un recorrido recomendado del MVP es:

    HomePage
       ↓
    PetsPage
       ↓
    RegisterPetPage → POST /api/mascotas
       ↓
    PetsPage / HomePage → GET /api/mascotas
       ↓
    DigitalCardPage → GET /api/mascotas/:id
       ↓
    MedicalHistoryPage → GET/POST/PUT historial

Como flujos complementarios:

    AlertsPage → GET/POST/PUT alertas
    MapPage    → GET lugares

Este flujo permite demostrar que la aplicación consulta datos desde la API, crea y modifica información, muestra estados de carga/error y conserva los cambios después de reiniciar el backend.

---

## 13. Cómo ejecutar el proyecto

### Requisitos
Tener instalado:
- Node.js 22.5 o superior.
- npm.
- Git.

### 1. Clonar el repositorio

    git clone https://github.com/soledadvasquez-a11y/Protecto_Interactivo_PetPass.git

Entrar al proyecto:

    cd Protecto_Interactivo_PetPass

### 2. Instalar dependencias del frontend
Desde la raíz del proyecto:

    npm install

### 3. Instalar dependencias del backend
Ingresar a la carpeta backend:

    cd backend
    npm install
    cd ..

### 4. Ejecutar el backend
Desde una terminal:

    cd backend
    npm run dev

El servidor backend se ejecuta en:
`http://localhost:3000`

Para verificar su funcionamiento:
`http://localhost:3000/api/health`

Respuesta esperada:

    {
      "status": "ok"
    }

La base de datos SQLite se crea e inicializa automáticamente cuando el backend utiliza `backend/src/db.js` por primera vez.

### 5. Ejecutar el frontend
Abrir otra terminal desde la raíz del proyecto:

    npm run dev

Vite mostrará la dirección local de la aplicación, normalmente:
`http://localhost:5173`

El frontend utiliza el proxy de Vite para enviar las solicitudes que comienzan con `/api/` al backend en `http://localhost:3000`.

### Importante
Para utilizar las funcionalidades integradas de PetPass, deben estar ejecutándose simultáneamente:
- El servidor frontend (React + Vite).
- El servidor backend (Node.js + Express).

---

## 14. Evidencias del proyecto

- [x] Ficha Inicial del Proyecto – Versión 0.1.
- [x] Matriz de selección de ideas y enfoque.
- [x] Product Goal aprobado por el equipo.
- [x] Scrum Team identificado.
- [x] Repositorio GitHub creado.
- [x] Frontend y backend integrados mediante API REST.
- [x] M4, M5 y M6 actualizados para el EC2.
- [x] Persistencia implementada con SQLite.
- [x] README con instrucciones de ejecución y aportes del equipo.

---

## 15. Referencias de trabajo

- Scrum Guide 2020 – Ken Schwaber y Jeff Sutherland: https://scrumguides.org/download
- PMI – A Spectrum of Approaches: https://www.pmi.org/learning/thought-leadership/series/achieving-greater-agility/spectrum-of-approaches
- PMI – Agile Practice Guide, Second Edition: https://www.pmi.org/standards/agile

---

## 16. Historial del documento

| Versión | Fecha | Cambio principal |
|---|---|---|
| 0.1 | 10/09/2026 | Definición inicial del proyecto. |
| 0.2 | 12/11/2026 | Actualización del MVP, tecnologías, arquitectura, integrantes e instrucciones de ejecución del proyecto. |
| 0.3 | 17/11/2026 | Integración de SQLite, documentación de persistencia, tablas, seeds e integridad referencial. |
| 0.4 | 17/11/2026 | Cierre documental para EC2: cuentas GitHub, aportes técnicos, flujo principal, requisitos y evidencias finales. |