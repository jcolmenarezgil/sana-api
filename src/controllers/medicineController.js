import Medicine from '../models/Medicine.js';

// GET
export const getMedicine = async (req, res) => {
    try {
        const medicines = await Medicine.find().sort({ name: 1 });
        res.status(200).json(medicines);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST

export const createMedicine = async (req, res) => {
    try {
        const newMedicine = new Medicine(req.body);
        await newMedicine.save();
        res.status(201).json(newMedicine);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// PUT 

export const updateMedicine = async (req, res) => {
    try {
        const updated = await Medicine.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updated);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE

export const deleteMedicine = async (req, res) => {
    try {
        const deleted = await Medicine.findOneAndDelete({ _id: req.params.id });
        if (!deleted) return res.status(404).json({ message: "Medicina no encontrada." });

        res.status(200).json({ message: "Medicina eliminada correctamente."})
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
