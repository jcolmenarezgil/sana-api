import Patient from '../models/Patient.js';
import Consultation from '../models/Consultation.js';
import Prescription from '../models/Prescription.js';
import Budget from '../models/Budget.js';

export const createPatient = async (req, res) => {
    try {
        const patient = new Patient(req.body);
        await patient.save();
        res.status(201).json(patient);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getPatients = async (req, res) => {
    try {
        const patients = await Patient.find();
        res.json(patients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// GET FULL
export const getFullPatientHistory = async (req, res) => {
    try {
        const { id } = req.params;

        // Ejecutamos todas las consultas en paralelo para máxima velocidad
        const [patient, consultations, prescriptions, budgets] = await Promise.all([
            Patient.findById(id),
            Consultation.find({ patient_id: id }).sort({ date: -1 }),
            Prescription.find({ patient_id: id })
                .populate('patient_id', 'birthDate')
                .populate('medication.medicine_id', 'name generic_name')
                .sort({ date_issued: -1 }),
            Budget.find({ patient_id: id }).sort({ createdAt: -1 })
        ]);

        if (!patient) {
            return res.status(404).json({ message: "Paciente no encontrado" });
        }

        // Calculamos balance total (Deuda acumulada de todos sus presupuestos)
        const totalDebt = budgets.reduce((acc, budget) => acc + budget.balance_due, 0);

        res.status(200).json({
            patient,
            summary: {
                total_consultations: consultations.length,
                total_prescriptions: prescriptions.length,
                pending_balance: totalDebt
            },
            history: {
                consultations,
                prescriptions,
                budgets
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};