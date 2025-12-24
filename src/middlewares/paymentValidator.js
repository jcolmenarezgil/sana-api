import Budget from '../models/Budget.js';

export const validatePaymentLimit = async (req, res, next) => {
    try {
        const { amount, payable_id, payable_type } = req.body;

        if (payable_type === 'Budget') {
            const budget = await Budget.findById(payable_id).populate('payments');

            if (!budget) {
                return res.status(400).json({ message: "Presupuesto no encontrado" });
            }

            // Usamos el virtual balance 
            if (amount > budget.balance_due) {
                return res.status(400).json({
                    message: "Pago rechazado",
                    details: `El monto (${amount}) supera el saldo pendiente (${budget.balance_due})`
                });
            }
        }

        next();
    } catch (error) {
        res.status(500).json({ message: "Error interno en la validación de pago" });
    }
};