import express from 'express';
import { createPrescription, getPrescriptions } from '../controllers/prescriptionController';
import { prescriptionSchema } from '../validators/prescriptionValidator.js';
import { validateSchema } from '../middlewares/schemaValidator.js';

const router = express.Router();

// GET
router.get('/', getPrescriptions);

// POST
router.post('/', validateSchema(prescriptionSchema), createPrescription);

export default router;