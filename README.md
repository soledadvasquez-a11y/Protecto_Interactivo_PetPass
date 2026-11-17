# PetPass La Paz

PetPass La Paz es un MVP web orientado al cuidado y gestión de mascotas. Permite registrar mascotas, consultar y editar su información, acceder a su carnet digital e historial médico, publicar alertas comunitarias y consultar lugares relacionados con el cuidado animal.

El proyecto integra **React + Vite** en el frontend, una **API REST con Node.js + Express** y persistencia mediante **SQLite**.

---

## Cómo ejecutar

### Requisitos

- Node.js **22.5 o superior**.
- npm.
- Git.

SQLite se utiliza mediante `node:sqlite`, por lo que no es necesario instalar un paquete SQLite adicional.

### 1. Instalar las dependencias del frontend

Desde la raíz del proyecto:

```powershell
npm install
```

### 2. Instalar las dependencias del backend

```powershell
cd backend
npm install
```

Luego volver a la raíz:

```powershell
cd ..
```

### 3. Encender el backend

En una primera terminal:

```powershell
cd backend
npm run dev
```

El servidor Express estará disponible normalmente en:

```text
http://localhost:3000
```

Puede comprobarse mediante:

```text
http://localhost:3000/api/health
```

Respuesta esperada:

```json
{
  "status": "ok"
}
```

### 4. Encender el frontend

En una segunda terminal, desde la raíz del proyecto:

```powershell
npm run dev
```

Vite mostrará la dirección local de la aplicación, normalmente:

```text
http://localhost:5173
```

### Base de datos

La base de datos:

```text
backend/petpass.db
```

se crea automáticamente cuando se inicia el backend por primera vez.

Si las tablas están vacías, el proyecto carga los datos iniciales de demostración desde:

```text
backend/src/data
```

Los archivos `.db` están excluidos de Git mediante `.gitignore`.

---

## Tecnologías

### Frontend

- React
- Vite
- React Router
- CSS
- Fetch API

### Backend

- Node.js
- Express
- API REST

### Base de datos

- SQLite mediante `node:sqlite`

### Desarrollo y organización

- Git
- GitHub
- Pull Requests
- Ramas por funcionalidad

---

## Arquitectura general

```text
Frontend React
     ↓
fetch('/api/...')
     ↓
Proxy de Vite
     ↓
Express
     ↓
Rutas
     ↓
Controladores
     ↓
SQLite
```

Durante el desarrollo, el frontend se ejecuta normalmente en el puerto `5173` y el backend en el puerto `3000`.

El proxy configurado en Vite redirige las solicitudes que comienzan con:

```text
/api
```

hacia el backend de Express.

Esto permite realizar solicitudes desde React utilizando rutas relativas como:

```js
fetch('/api/mascotas')
```

sin escribir directamente la dirección del servidor backend en cada página.

---

## Flujo principal

El flujo principal de PetPass permite registrar una mascota, consultar su información y acceder a diferentes herramientas relacionadas con su cuidado.

```text
HomePage
   ↓
Mis Mascotas
   ↓
Seleccionar mascota
   ↓
Detalle de mascota
   ├── Editar mascota
   ├── Carnet digital
   └── Historial médico
```

La creación de una nueva mascota sigue este flujo:

```text
RegisterPetPage
      ↓
POST /api/mascotas
      ↓
Express
      ↓
SQLite
      ↓
PetsPage
      ↓
GET /api/mascotas
```

Una mascota creada desde el formulario queda almacenada en SQLite y continúa disponible incluso después de reiniciar la API.

PetPass también incluye módulos complementarios:

```text
HomePage
   ├── Mascotas
   ├── Historial médico
   ├── Alertas comunitarias
   └── Mapa de lugares
```

---

## Funcionalidades principales

### Mascotas

Permite:

- listar mascotas;
- consultar una mascota por id;
- registrar una mascota;
- editar sus datos;
- cambiar su estado;
- eliminar una mascota;
- acceder a su carnet digital;
- acceder a su historial médico.

### Historial médico

Permite consultar los registros médicos correspondientes a una mascota.

Los registros pueden clasificarse como:

```text
vaccine
deworming
consultation
```

También pueden crearse y editarse desde la aplicación.

### Alertas comunitarias

PetPass permite trabajar con alertas de:

```text
lost
adoption
emergency
```

Las alertas pueden filtrarse por tipo y zona.

También pueden publicarse desde la interfaz y cambiar su estado entre:

```text
active
resolved
```

Cuando una alerta `lost` activa está vinculada a una mascota registrada, PetPass mantiene sincronizado el estado de la mascota.

### Mapa de lugares

Permite consultar lugares relacionados con el cuidado animal.

La interfaz incluye:

- búsqueda;
- filtros por categoría;
- marcadores;
- selección de lugares;
- información detallada del lugar seleccionado.

---

## API REST

La API utiliza el prefijo:

```text
/api
```

### Estado del servidor

```text
GET /api/health
```

Comprueba que la API esté encendida.

### Mascotas

```text
GET    /api/mascotas
GET    /api/mascotas/:id
POST   /api/mascotas
PUT    /api/mascotas/:id
DELETE /api/mascotas/:id
```

`GET /api/mascotas` acepta el filtro:

```text
?especie=
```

### Historial médico

```text
GET  /api/mascotas/:petId/historial
GET  /api/historial/:id
POST /api/mascotas/:petId/historial
PUT  /api/historial/:id
```

El historial de una mascota también puede filtrarse mediante:

```text
?type=
```

### Lugares

```text
GET /api/lugares
GET /api/lugares/:id
```

El listado acepta:

```text
?category=
?q=
```

### Alertas

```text
GET  /api/alertas
GET  /api/alertas/:id
POST /api/alertas
PUT  /api/alertas/:id
```

El listado puede filtrarse mediante:

```text
?type=
?zone=
```

---

## Validaciones de la API

La API utiliza respuestas HTTP para diferenciar distintos tipos de resultados.

### 200

Solicitud realizada correctamente.

### 201

Recurso creado correctamente.

Por ejemplo:

```text
POST /api/mascotas
POST /api/alertas
```

### 204

Operación completada correctamente sin contenido de respuesta.

Por ejemplo, al eliminar una mascota.

### 400

Se utiliza cuando los datos recibidos no son válidos.

Ejemplos:

```text
El id debe ser un número
Especie no válida
Tipo de alerta no válido
Zona no válida
La descripción es obligatoria
```

### 404

Se utiliza cuando el recurso solicitado no existe.

Ejemplos:

```text
Mascota no encontrada
Registro médico no encontrado
Lugar no encontrado
Alerta no encontrada
Ruta no encontrada
```

---

## Base de datos

PetPass utiliza SQLite para almacenar la información de forma persistente.

La base contiene cuatro tablas principales, correspondientes a las listas de datos documentadas en M5:

```text
pets
medical_records
places
alerts
```

### `pets`

Almacena la información principal de las mascotas:

```text
id
name
photo
species
breed
age
weight
sex
color
birthDate
status
```

### `medical_records`

Almacena los registros médicos asociados a una mascota:

```text
id
petId
type
title
date
nextDate
place
description
```

`petId` referencia a:

```text
pets(id)
```

Si se elimina una mascota, sus registros médicos asociados se eliminan mediante:

```text
ON DELETE CASCADE
```

### `places`

Almacena los lugares mostrados en el mapa:

```text
id
category
type
name
address
schedule
description
photo
position
```

El campo `position` se almacena en formato JSON.

### `alerts`

Almacena las alertas comunitarias:

```text
id
type
petId
petName
photo
zone
location
date
description
contact
status
```

Cuando una alerta está asociada a una mascota, `petId` referencia a:

```text
pets(id)
```

Si la mascota es eliminada, la alerta puede conservarse y su relación pasa a:

```text
petId = NULL
```

mediante:

```text
ON DELETE SET NULL
```

---

## Persistencia

Los controladores trabajan directamente con SQLite mediante operaciones SQL.

Las operaciones principales son:

```text
GET     → SELECT
POST    → INSERT
PUT     → UPDATE
DELETE  → DELETE
```

Por ejemplo, al registrar una mascota:

```text
Formulario React
      ↓
POST /api/mascotas
      ↓
INSERT INTO pets
      ↓
SQLite
```

Al reiniciar el backend y volver a consultar:

```text
GET /api/mascotas
```

el registro continúa disponible porque los datos ya no dependen de arreglos en memoria.

---

## Integridad referencial

El proyecto habilita las claves foráneas de SQLite mediante:

```sql
PRAGMA foreign_keys = ON;
```

Después de inicializar y cargar los datos, también se comprueba la integridad mediante:

```sql
PRAGMA foreign_key_check;
```

Esto permite detectar referencias inválidas entre las tablas.

Las relaciones principales son:

```text
pets
 ├── medical_records
 │      ON DELETE CASCADE
 │
 └── alerts
        ON DELETE SET NULL
```

---

## Datos de demostración

Los archivos de:

```text
backend/src/data
```

se conservan únicamente como datos iniciales o seeds.

Los controladores no utilizan esos arreglos como almacenamiento principal.

Cuando la base de datos está vacía, los seeds permiten crear un conjunto inicial de datos para probar y presentar la aplicación.

El estado inicial incluye datos de demostración para:

```text
6 mascotas
13 registros médicos
8 lugares
6 alertas
```

---

## Manejo de estados en el frontend

Las páginas que consumen información de la API manejan estados como:

```text
loading
error
saving
```

Esto permite mostrar mensajes al usuario durante las solicitudes.

Por ejemplo:

```text
Cargando...
No se pudo cargar...
Guardando...
```

Si el backend está apagado y una solicitud `fetch` falla, la aplicación muestra un aviso de conexión en lugar de dejar la pantalla sin respuesta.

---

## Organización del proyecto

```text
petpass-la-paz/
│
├── public/
│
├── src/
│   ├── assets/
│   ├── components/
│   ├── layouts/
│   ├── pages/
│   └── App.jsx
│
├── backend/
│   └── src/
│       ├── controllers/
│       ├── data/
│       ├── routes/
│       ├── db.js
│       └── server.js
│
├── README.md
├── package.json
└── vite.config.js
```

---

## Equipo y aportes

| Integrante | Cuenta de GitHub | Páginas y componentes | Endpoints y base de datos |
|---|---|---|---|
| **Heidy Quispe** | `HeidyCQC` · `HeidyCamila` | RegisterPetPage, PetsPage, DigitalCardPage, componentes de mascotas e historial, M5 de mascotas e integración final frontend–backend | Validaciones de API, proxy de Vite, integración CRUD de mascotas, esquema SQLite de `pets`, persistencia de mascotas y reglas de sincronización entre alertas `lost` y estado de mascotas |
| **Daniel Gutierrez** | `dani4773` · `Daniel Gutierrez` | PublicPetProfilePage, MapPage, AlertsPage, AccountPage, componentes compartidos y flujos de mascotas/comunidad | Servidor Express inicial, endpoints de mascotas e historial médico, datos de demostración, esquema SQLite de `alerts` y persistencia de alertas/lugares |
| **Soledad Vasquez** | `soledadvasquez-a11y` | OnboardingPage, LoginPage, HomePage, RegisterTutorPage, historial médico, M5 de comunidad e integración de páginas con la API | API de alertas, integración HomePage/DigitalCardPage, esquema SQLite de `medical_records` y `places`, persistencia del historial médico, integridad referencial y cierre final de SQLite |

### Trabajo colaborativo

El proyecto fue desarrollado mediante ramas de trabajo y Pull Requests integrados progresivamente a `main`.

Durante las diferentes etapas se trabajó en:

- componentes reutilizables;
- páginas del flujo principal;
- documentación M4, M5 y M6;
- estados y condiciones de interfaz;
- API REST;
- validaciones;
- conexión frontend–backend;
- CRUD;
- persistencia SQLite;
- integridad referencial;
- reglas de negocio;
- pruebas de regresión;
- documentación final para el EC2.

---

## Evidencias del EC2

El proyecto permite demostrar:

```text
✓ Arranque del frontend y backend siguiendo este README
✓ Lista → detalle → acción
✓ Creación mediante POST desde la interfaz
✓ Persistencia después de reiniciar la API
✓ Modificación mediante PUT
✓ Eliminación mediante DELETE
✓ Respuestas 400 ante datos inválidos
✓ Respuestas 404 ante recursos inexistentes
✓ Manejo visual cuando la API está apagada
✓ Datos persistentes en SQLite
✓ Frontend integrado con la API
```

La documentación de estados y datos se encuentra en M5 y la documentación de endpoints en M6.

---

## Estado actual

PetPass La Paz cuenta con un MVP web integrado que conecta:

```text
Interfaz React
      +
Estado y formularios
      +
API Express
      +
SQLite
      +
Persistencia
```

El proyecto está preparado para demostrar el flujo completo de integración requerido en el EC2.