import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    dni: { type: String, unique: true, sparse: true }, // TODO: modificar a un documento más local
    email: { type: String, lowercase: true, trim: true },
    phone: String,
    birthDate: Date,
    gender: { type: String, enum: ['Masculino', 'Femenino', 'Otro'] }
}, { timestamps: true });

// Campo virtual para obtener el nombre completo en un variable
patientSchema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.lastName}`;
});

export default mongoose.model('Patient', patientSchema);