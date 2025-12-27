import Consultation from "../models/Consultation";

export const createConsultation = async (req, res) => {
    try {
        const newConsultation = new Consultation(req.body);
        const saved = await newConsultation.save();
        res.status(201).json(saved);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getPatientHistory = async (req, res) => {
    try {
        const { patient_id } = req.params;
        const history = await Consultation.find({ patient_id })
            .sort({ date: -1 })
            .populate('payments');
        res.status(200).json(history);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}