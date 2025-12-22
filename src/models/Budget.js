import mongoose, { Types } from "mongoose";

const budgetSchema = new mongoose.Schema({
    patient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    title: { type: String },
    items: [{
        procedure_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Procedure',
            required: true
        },
        price: { type: Number, required: true }
    }],
    total_amount: { type: Number, default: 0 },
    status: {
        type: String,
        enum: ['DRAFT', 'SENT', 'ACCEPTED', 'REJECTED'],
        default: 'DRAFT'
    }
}, { timestamps: true });

export default mongoose.model('Budget', budgetSchema);