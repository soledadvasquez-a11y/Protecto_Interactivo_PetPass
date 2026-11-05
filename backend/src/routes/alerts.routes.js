import { Router } from 'express'
import {
  getAlerts,
  getAlertById,
} from '../controllers/alerts.controller.js'

const router = Router()

router.get('/', getAlerts)
router.get('/:id', getAlertById)

export default router
