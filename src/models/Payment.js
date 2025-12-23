import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    patient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    amount: { type: Number, required: true },
    method: { type: String, enum: ['Efectivo', 'Tarjeta', 'Transferencia'], required: true },
    // referencia dinámica
    payable_id: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: 'payable_type' },
    payable_type: { type: String, required: true, enum: ['Budget', 'Consultation'] },
    date: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('Payment', paymentSchema);