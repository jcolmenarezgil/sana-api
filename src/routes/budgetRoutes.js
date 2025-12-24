import express from 'express';
import { createBudget, getBudgets, getBudgetsByPatient, updateBudgetStatus } from '../controllers/budgetController.js';

const router = express.Router();

router.get('/', getBudgets);
router.post('/', createBudget);

// GET BY /api/budgets/patient/ID_DEL_PACIENTE
router.get('/patient/:patient_id', getBudgetsByPatient);

// PUT
router.patch('/:id/status', updateBudgetStatus);

export default router;