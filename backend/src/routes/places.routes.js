import { Router } from 'express';

import {
  getPlaces,
  getPlaceById,
} from '../controllers/places.controller.js';

const router = Router();

router.get('/', getPlaces);
router.get('/:id', getPlaceById);

export default router;