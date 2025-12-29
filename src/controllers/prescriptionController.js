import Prescription from '../models/Prescription.js';
import Medicine from '../models/Medicine.js';

export const createPrescription = async (req, res) => {
    try {
        const { patient_id, related_procedures, medication } = req.body;

        // Procesamos cada medicamento para aplicar los valores por defecto (si es necesario)
        const processedMedication = await Promise.all(medication.map(async (item) => {
            const medicineBase = await Medicine.findById(item.medicine_id);

            if (!medicineBase) {
                throw new Error(`La medicina con ID ${item.medicine_id} no existe.`);
            }

            return {
                medicine_id: item.medicine_id,
                // Si el médico envía un dato personalizado lo usamos, si no, usamos el de Medicine (por defecto)
                custom_dosage_form: item.custom_dosage || medicineBase.default_dosage,
                custom_schedule: item.custom_schedule || medicineBase.default_schedule,
                custom_instructions: item.custom_instructions || medicineBase.default_instructions
            };
        }));

        const newPrescription = new Prescription({
            patient_id,
            related_procedures,
            medication: processedMedication
        });

        const saved = await newPrescription.save();

        // Retornamos la receta populada para ver los nombres de las medicinas de inmediato
        const populated = await Prescription.findById(saved._id)
            .populate('patient_id', 'firstName lastName dni birthDate')
            .populate('medication.medicine_id', 'name generic_name default_dosage');
        
        res.status(201).json(populated);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getPrescriptions = async (req, res) => {
    try {
        const prescriptions = await Prescription.find()
            .populate('patient_id', 'firstName lastName dni birthDate')
            .populate('medications.medicine_id', 'name generic_name')
            .populate('related_procedures', 'name');
        res.status(200).json(prescriptions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};