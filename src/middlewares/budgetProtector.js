import Budget from '../models/Budget.js';

export const protectPaidBudget = async (req, res, next) => {
    try {
        const { id } = req.params;

        const budget = await Budget.findById(id).populate('payments');

        if (!budget) {
            return res.status(404).json({ message: "Presupuesto no encontrado." });
        }

        if (budget.total_paid > 0) {
            return res.status(403).json({
                message: "Acción denegada",
                details: "o se puede modificar un presupuesto que ya tiene pagos registrados. Si necesita hacer cambios, debe anular los pagos primero o crear un nuevo presupuesto."
            })
        }

        next();
    } catch (error) {
        res.status(500).json({ message: "Error en la validación de integridad del Presupuesto"})
    }
}