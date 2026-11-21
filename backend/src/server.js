
import express from 'express'
import cors from 'cors'

import petsRouter from './routes/pets.routes.js'
import medicalRecordsRouter, {
  petHistoryRouter,
} from './routes/medicalRecords.routes.js'
import placesRouter from './routes/places.routes.js'
import alertsRouter from './routes/alerts.routes.js'

const app = express()
const PORT = 3000

// Habilitar CORS para PetPass Mobile
app.use(cors())

// Permitir peticiones con JSON
app.use(express.json())

// Verificar el estado de la API
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

// Rutas de historial médico por mascota
app.use(
  '/api/mascotas/:petId/historial',
  petHistoryRouter
)

// Rutas principales de PetPass
app.use('/api/mascotas', petsRouter)
app.use('/api/historial', medicalRecordsRouter)
app.use('/api/lugares', placesRouter)
app.use('/api/alertas', alertsRouter)

// Manejar rutas que no existen
app.use((req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
  })
})

// Iniciar servidor
app.listen(PORT, () => {
  console.log(
    `API de PetPass en http://localhost:${PORT}`
  )
})
