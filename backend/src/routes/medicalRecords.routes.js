import { Router } from 'express';

import {
  getMedicalRecordsByPet,
  getMedicalRecordById,
} from '../controllers/medicalRecords.controller.js';

const petHistoryRouter = Router({
  mergeParams: true,
});

petHistoryRouter.get(
  '/',
  getMedicalRecordsByPet
);

const medicalRecordsRouter = Router();

medicalRecordsRouter.get(
  '/:id',
  getMedicalRecordById
);

export {
  petHistoryRouter,
};

export default medicalRecordsRouter;