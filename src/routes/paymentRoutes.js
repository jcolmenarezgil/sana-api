import express from 'express';
import { createPayment, getPaymentsByPatient } from '../controllers/paymentController.js';
import { validatePaymentLimit } from '../middlewares/paymentValidator.js';

const router = express.Router();

router.post('/', validatePaymentLimit, createPayment);
router.get('/patient/:patient_id', getPaymentsByPatient);

export default router;