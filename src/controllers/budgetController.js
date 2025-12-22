import Budget from '../models/Budget.js';
import Procedure from '../models/Procedure.js';

//GET
export const getBudgets = async (req, res) => {
    try {
        // Populate busca en la coleccion 'Procedures' los datos de los IDS guardados
        const budgets = await Budgets.find()
            .populate('items.procedure_id', 'name code');
        
        res.status(200).json(budgets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//POST
export const createBudget = async (req, res) => {
    try {
        const { patient_name, selected_procedures } = req.body; // TODO: selected_procedures será un array de objetos: [{ id: "...", price: 100 }]

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
            patient_name,
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