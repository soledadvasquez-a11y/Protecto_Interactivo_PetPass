import express from 'express'
import petsRouter from './routes/pets.routes.js'

const app = express()
const PORT = 3000

app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.use('/api/mascotas', petsRouter)

app.use((req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
  })
})

app.listen(PORT, () => {
  console.log(
    `API de PetPass en http://localhost:${PORT}`
  )
})