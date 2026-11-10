import { Router } from 'express';

import {
  createPet,
  deletePet,
  getPets,
  getPetById,
  updatePet,
} from '../controllers/pets.controller.js';

const router = Router();

router.get('/', getPets);
router.post('/', createPet);

router.get('/:id', getPetById);
router.put('/:id', updatePet);
router.delete('/:id', deletePet);

export default router;