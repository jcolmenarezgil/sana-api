import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    generic_name: { type: String },                         // Ibuprofeno
    category: { type: String },                             // Advil
    // Automatización de la prescripciones
    default_dosage: { type: String },                       // Tabletas 500mg
    default_schedule: { type: String },                     // Cada 8 Horas
    default_instructions: { type: String },                 // Tomar después de las comidas
    // TODO campo de seguridad clinica MIDDLEWARE de contraindicaciones medicas
    contraindicated: { type: String },
}, { timestamps: true });

// Protección antes de eliminar
medicineSchema.pre('findOneAndDelete', async function (next) {
    const medicineId = this.getQuery()._id;
    const Prescription = mongoose.model('Prescription');
    const isUsed = await Prescription.findOne({ "medications.medicine_id": medicineId });

    if (isUsed) {
        const error = new Error('No se puede eliminar: Esta medicina está vinculada a recetas existentes.');
        return next(error);
    }
    next();
});

export default mongoose.model('Medicine', medicineSchema);