import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema({
    patient_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    date_issued: { type: Date, default: Date.now },
    related_procedures: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Procedure'
    }],
    medication: [{
        medicine_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Medicine',
            required: true
        },
        custom_dosage: { type: String },
        custom_schedule: { type: String },
        custom_instructions: { type: String }
    }]
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

prescriptionSchema.virtual('patient_age').get(function () {
    if (this.patient_id && this.patient_id.birthDate) {
        const diff = Date.now() - this.patient_id.birthDate.getTime();
        const ageDate = new Date(diff);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
    return null;
});

export default mongoose.model('Prescription', prescriptionSchema);