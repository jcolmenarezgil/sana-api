import Budget from '../models/Budget.js';
import Patient from '../models/Patient.js';
import Procedure from '../models/Procedure.js';

//GET
export const getBudgets = async (req, res) => {
    try {
        // Populate busca en la coleccion 'Procedures' los datos de los IDS guardados
        const budgets = await Budget.find()
            .populate('patient_id', 'firstName LastName dni')
            .populate('items.procedure_id', 'name code')
            .populate('payments');
        
        res.status(200).json(budgets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//GET BY
export const getBudgetsByPatient = async (req, res) => {
    try {
        const { patient_id } = req.params;

        const budgets = await Budget.find({ patient_id })
            .populate('items.procedure_id', 'name code')
            .populate({
                path: 'payments',
                select: 'amount payable_type'
            })
        
        res.status(200).json(budgets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//POST
export const createBudget = async (req, res) => {
    try {
        const { patient_id, selected_procedures } = req.body; // TODO: selected_procedures será un array de objetos: [{ id: "...", price: 100 }]

        // buscamos al paciente para verificar que existe
        const patient = await Patient.findById(patient_id);
        if (!patient) return res.status(404).json({ message: 'Patient ' })

        // extraer ids para busqueda
        const ids = selected_procedures.map(p => p.id);
        const proceduresData = await Procedure.find({ _id: { $in: ids } });

        // generar el titulo dinamico
        const title = proceduresData.map(p => p.name).join(' + ');

        // mapear los items y calcular totales
        const items = selected_procedures.map(item => ({
            procedure_id: item.id,
            price: item.price

        }));

        // calculamos el total_amount
        const total_amount = items.reduce((sum, item) => sum + item.price, 0);

        // guardar el presupuesto
        const newBudget = new Budget({
            patient_id,
            title,
            items,
            total_amount
        });

        const savedBudget = await newBudget.save();
        res.status(201).json(savedBudget);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// PUT 
export const updateBudgetStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        // Ubicamos el balance del presupuesto actual
        const budget = await Budget.findById(id).populate('payments');

        if (!budget) {
            return res.status(404).json({ message: "Presupuesto no encontrado" });
        }

        // Validación de integridad: No rechazar si tiene pagos registrados
        if (status === 'REJECTED' && budget.total_paid > 0) {
            return res.status(400).json({
                message: "Inconsistencia detectada",
                details: `No se puede marcar como REJECTED un presupuesto que tiene abonos (Total pagado: ${budget.total_paid} )`
            });
        }

        // Actualizar estado a pagado con balance (deuda) en 0
        let finalStatus = status;

        if (budget.balance_due <= 0) {
            finalStatus = 'PAID';
        }

        // Si las condiciones anteriores son correctas, Actualizar
        const updatedBudget = await Budget.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        ).populate('payments');

        res.status(200).json(updatedBudget);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};