import Payment from '../models/Payment.js';
import Budget from '../models/Budget.js';

// POST
export const createPayment = async (req, res) => {
    try {
        const { patient_id, amount, method, payable_id, payable_type, notes } = req.body;
        
        // Validar si el objeto existe
        if (payable_type === 'Budget') {
            const budgetExists = await Budget.findById(payable_id);
            if (!budgetExists) {
                return res.status(404).json({ message: "El presupuesto indicado no existe." });
            }
        }

        const newPayment = new Payment({
            patient_id,
            amount,
            method,
            payable_id,
            payable_type,
            notes
        });

        const savedPayment = await newPayment.save();

        // Preparar la respuesta con datos del paciente
        const response = await savedPayment.populate('patient_id', 'firstName lastName');

        res.status(201).json(response);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// GET
export const getPaymentsByPatient = async (req, res) => {
    try {
        const { patient_id } = req.params;
        const payments = await Payment.find({ patient_id })
            .sort({ createdAt: -1 });
        
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};