import express from 'express';
import { createPrescription, getPrescriptions } from '../controllers/prescriptionController.js';
import { prescriptionSchema } from '../validators/prescriptionValidator.js';
import { validateSchema } from '../middlewares/schemaValidator.js';
import { checkClinicalSafety } from '../middlewares/safetyChecker.js';

const router = express.Router();

// GET
router.get('/', getPrescriptions);

// POST
router.post('/',
    validateSchema(prescriptionSchema),
    checkClinicalSafety,
    createPrescription);

export default router;