import mongoose from "mongoose";

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
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { viruals: true }
});

budgetSchema.virtual('payments', {
    ref: 'Payment',
    localField: '_id',
    foreignField: 'payable_id'
});
 
budgetSchema.virtual('total_paid').get(function () {
    if (!this.payments) return 0;
    return this.payments
        .filter(p => p.payable_type === 'Budget')
        .reduce((sum, p) => sum + p.amount, 0)
});

budgetSchema.virtual('balance_due').get(function () {
    return this.total_amount - (this.total_paid)
})

export default mongoose.model('Budget', budgetSchema);