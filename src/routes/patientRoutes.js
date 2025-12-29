import express from 'express';
import { createPatient, getFullPatientHistory, getPatients } from '../controllers/patientController.js';
import { patientSchema } from '../validators/patientValidator.js';
import { validateSchema } from '../middlewares/schemaValidator.js';

const router = express.Router();

router.post('/', validateSchema(patientSchema), createPatient);
router.get('/', getPatients);

// GET FULL
router.get('/:id/history', getFullPatientHistory);

export default router;