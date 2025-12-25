import express from 'express';
import { createBudget, getBudgets, getBudgetsByPatient, updateBudgetStatus } from '../controllers/budgetController.js';
import { validateBudgetUpdate } from '../middlewares/requestValidator.js';

const router = express.Router();

router.get('/', getBudgets);
router.post('/', createBudget);

// GET BY /api/budgets/patient/ID_DEL_PACIENTE
router.get('/patient/:patient_id', getBudgetsByPatient);

// PATCH
router.patch('/:id/status', validateBudgetUpdate, updateBudgetStatus);

// Ejemplo: Si tuvieras una ruta para editar los items del presupuesto
//router.put('/:id', protectPaidBudget, updateBudgetItems);

// También podrías proteger el borrado
//router.delete('/:id', protectPaidBudget, deleteBudget);

export default router;