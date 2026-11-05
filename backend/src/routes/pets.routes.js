import { Router } from 'express'
import {
  getPets,
  getPetById,
} from '../controllers/pets.controller.js'

const router = Router()

router.get('/', getPets)
router.get('/:id', getPetById)

export default router