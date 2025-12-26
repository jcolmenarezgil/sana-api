import express from 'express';
import { createBudget, getBudgets, getBudgetsByPatient, updateBudgetStatus } from '../controllers/budgetController.js';
import { budgetSchema } from '../validators/budgetValidator.js';
import { validateSchema } from '../middlewares/schemaValidator.js';
import { validateBudgetUpdate } from '../middlewares/requestValidator.js';

const router = express.Router();

router.get('/', getBudgets);

// POST
router.post('/', validateSchema(budgetSchema), createBudget);

// GET BY /api/budgets/patient/ID_DEL_PACIENTE
router.get('/patient/:patient_id', getBudgetsByPatient);

// PATCH
router.patch('/:id/status', validateSchema(Joi.object({
    status: Joi.string().valid('DRAFT', 'SENT', 'ACCEPTED', 'REJECTED', 'PAID').required()
})), updateBudgetStatus);

// Ejemplo: Si tuvieras una ruta para editar los items del presupuesto
//router.put('/:id', protectPaidBudget, updateBudgetItems);

// También podrías proteger el borrado
//router.delete('/:id', protectPaidBudget, deleteBudget);

export default router;