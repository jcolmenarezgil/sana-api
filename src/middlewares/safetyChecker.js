import Medicine from '../models/Medicine.js';
import Consultation from '../models/Consultation.js';

export const checkClinicalSafety = async (req, res, next) => {
    try {
        const { patient_id, medication } = req.body;

        // Obtenemos todo el historial de notas del paciente (Consultas)
        const consultations = await Consultation.find({ patient_id });
        const allNotes = consultations
            .map(c => c.notes.toLowerCase())
            .join(" ");

        // Revisamos cada medicina de la nueva receta
        for (let item of medication) {
            const medicine = await Medicine.findById(item.medicine_id);

            if (medicine && medicine.contraindicated) {
                const warningTerm = medicine.contraindicated.toLocaleLowerCase();

                // Verificamos si el término de contraindicación está en las notas
                if (allNotes.includes(warningTerm) || warningTerm.split(" ").some(word => word.length > 3 && allNotes.includes(word))) {
                    return res.status(403).json({
                        message: "BLOQUEO DE SEGURIDAD MÉDICA",
                        details: `RIESGO: El medicamento ${medicine.name.toLowerCase()} está contraindicado por "${medicine.contraindicated}".`
                    });
                }
            }
        }
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};