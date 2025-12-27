import mongoose from "mongoose";

const consultationSchema = new mongoose.Schema({
    patientui_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    date: { type: Date, default: Date.now },
    reason: { type: String, required: true },
    diagnosis: { type: String },
    notes: { type: String },
    price: { type: Number, default: 0 },
    status: {
        type: String,
        enum: ['PENDING', 'COMPLETED', 'CANCELLED'],
        default: 'PENDING'
    }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

// Relación polimorfica para pagos 
consultationSchema.virtual('payments', {
    ref: 'Payment',
    localField: '_id',
    foreignField: 'payable_id'
});

export default mongoose.model('Consultation', consultationSchema);