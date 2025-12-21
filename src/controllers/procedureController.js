import Procedure from "../models/Procedure.js";

// CREATE
export const createProcedure = async (req, res) => {
    try {
        const newProcedure = new Procedure(req.body);
        const savedProcedure = await newProcedure.save();
        res.status(201).json(savedProcedure);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// GET ALL
export const getProcedures = async (req, res) => {
    try {
        const procedures = await Procedure.find({ isActive: true });
        res.json(procedures);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};