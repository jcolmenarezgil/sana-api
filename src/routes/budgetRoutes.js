import express from 'express';
import { createBudget, getBudgets } from '../controllers/budgetController.js';

const router = express.Router();

router.get('/', getBudgets);
router.post('/', createBudget);

export default router;