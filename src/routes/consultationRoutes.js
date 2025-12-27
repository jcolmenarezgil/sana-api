import express from 'express';
import { createConsultation, getPatientHistory } from '../controllers/consultationController';
import { consultationSchema } from '../validators/consultationValidator';
import { validateSchema } from '../middlewares/schemaValidator';

const router = express.Router();

// GET 
router.get('/patient/:patient_id', getPatientHistory);

// POST 
router.post('/', validateSchema(consultationSchema), createConsultation);

export default router;