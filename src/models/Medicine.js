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
medicineSchema.pre('findOneAndDelete', async function () {
    // Obtenemos el ID del filtro de la consulta
    const medicineId = this.getQuery()._id;
    
    // Accedemos al modelo de Prescripción
    const Prescription = mongoose.model('Prescription');

    // Buscamos si existe alguna receta con esta medicina
    const isUsed = await Prescription.findOne({ "medication.medicine_id": medicineId });

    if (isUsed) {
        // En lugar de next(error), lanzamos el error directamente
        throw new Error('No se puede eliminar: Esta medicina está vinculada a recetas existentes.');
    }
});

export default mongoose.model('Medicine', medicineSchema);