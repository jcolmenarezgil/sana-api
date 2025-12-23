import express from 'express';
import { createPayment, getPaymentsByPatient } from '../controllers/paymentController.js';

const router = express.Router();

router.post('/', createPayment);
router.get('/patient/:patient_id', getPaymentsByPatient);

export default router;