import express from 'express';
import { createBudget, getBudgets, getBudgetsByPatient, updateBudgetStatus } from '../controllers/budgetController.js';

const router = express.Router();

router.get('/', getBudgets);
router.post('/', createBudget);

// GET BY /api/budgets/patient/ID_DEL_PACIENTE
router.get('/patient/:patient_id', getBudgetsByPatient);

// PUT
router.patch('/:id/status', updateBudgetStatus);

// Ejemplo: Si tuvieras una ruta para editar los items del presupuesto
//router.put('/:id', protectPaidBudget, updateBudgetItems);

// También podrías proteger el borrado
//router.delete('/:id', protectPaidBudget, deleteBudget);

export default router;