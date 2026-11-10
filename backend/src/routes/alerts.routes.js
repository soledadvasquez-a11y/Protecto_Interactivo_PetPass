import { Router } from 'express';

import {
  createAlert,
  getAlerts,
  getAlertById,
  updateAlert,
} from '../controllers/alerts.controller.js';

const router = Router();

router.get('/', getAlerts);
router.post('/', createAlert);
router.get('/:id', getAlertById);
router.put('/:id', updateAlert);

export default router;