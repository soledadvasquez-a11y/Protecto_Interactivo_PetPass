import { Router } from 'express';

import {
  createMedicalRecord,
  getMedicalRecordsByPet,
  getMedicalRecordById,
  updateMedicalRecord,
} from '../controllers/medicalRecords.controller.js';

const petHistoryRouter = Router({
  mergeParams: true,
});

petHistoryRouter.get(
  '/',
  getMedicalRecordsByPet
);

petHistoryRouter.post(
  '/',
  createMedicalRecord
);

const medicalRecordsRouter = Router();

medicalRecordsRouter.get(
  '/:id',
  getMedicalRecordById
);

medicalRecordsRouter.put(
  '/:id',
  updateMedicalRecord
);

export {
  petHistoryRouter,
};

export default medicalRecordsRouter;