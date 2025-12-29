import express from 'express';

import { getMedicine, createMedicine, updateMedicine, deleteMedicine } from '../controllers/medicineController.js';
import { medicineSchema } from '../validators/medicineValidator.js';
import { validateSchema } from '../middlewares/schemaValidator.js';

const router = express.Router();

// GET
router.get('/', getMedicine);

// POST 
router.post('/', validateSchema(medicineSchema), createMedicine);

// PUT 
router.put('/:id', validateSchema(medicineSchema), updateMedicine);

// DELETE
router.delete('/:id', deleteMedicine);

export default router;