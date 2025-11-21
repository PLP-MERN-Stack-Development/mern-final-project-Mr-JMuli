// backend/src/routes/prescriptionRoutes.js

import express from 'express';
import {
  uploadPrescription,
  getMyPrescriptions,
  approvePrescription
} from '../controllers/prescriptionController.js';
import { protect, pharmacist } from '../middlewares/auth.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

// All routes below this are protected
router.use(protect);

router.post('/', upload.array('images', 5), uploadPrescription);
router.get('/my', getMyPrescriptions);
router.patch('/:id/approve', pharmacist, approvePrescription);

export default router;