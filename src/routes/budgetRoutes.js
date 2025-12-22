import express from 'express';
import { createBudget } from '../controllers/budgetController.js'
const router = express.Router();

// Placeholder route response
router.get('/', (req, res) => {
    res.json({ status: "Module prepare to process request." })
});

// router.get('/', getBudgets); // TODO: Podrás añadirlo luego
router.post('/', createBudget);

export default router;