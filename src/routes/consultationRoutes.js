import express from 'express';
import { createConsultation, getPatientHistory } from '../controllers/consultationController.js';
import { consultationSchema } from '../validators/consultationValidator.js';
import { validateSchema } from '../middlewares/schemaValidator.js';

const router = express.Router();

// GET 
router.get('/patient/:patient_id', getPatientHistory);

// POST 
router.post('/', validateSchema(consultationSchema), createConsultation);

export default router;