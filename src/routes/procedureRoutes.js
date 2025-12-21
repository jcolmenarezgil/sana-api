import express from 'express';
import { createProcedure, getProcedures } from '../controllers/procedureController.js';

const router = express.Router();

router.post('/', createProcedure);
router.get('/', getProcedures);

export default router;