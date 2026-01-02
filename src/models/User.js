import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['SPECIALIST', 'ASSISTANT', 'PATIENT', 'ADMIN'],
        default: 'SPECIALIST'
    },

    // CASO PATIENT: vinculamos a su registro médico
    patient_reference: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: function () { return this.role === 'PATIENT'; }
    },

    // CASO SPECIALIST: Sus pacientes y sus compartidos
    my_patients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Patient' }],
    shared_patients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Patient' }],

    // CASO COLABORACIÓN: Para el caso de asistentes o especialistas que colaboran
    granted_access_to: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Medicos o pacientes que le han otorgado permiso
    }]
}, { timestamps: true });

// Encriptar contraseña antes de guardarla
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

export default mongoose.model('User', userSchema);