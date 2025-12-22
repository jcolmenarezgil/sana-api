import express from 'express';
import { createBudget, getBudgets, getBudgetsByPatient } from '../controllers/budgetController.js';

const router = express.Router();

router.get('/', getBudgets);
router.post('/', createBudget);

// GET BY /api/budgets/patient/ID_DEL_PACIENTE
router.get('/patient/:patient_id', getBudgetsByPatient);

export default router;