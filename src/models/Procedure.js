import mongoose from 'mongoose';

const procedureSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre del procedimiento es obligatorio'],
        unique: true,
        trim: true
    },
    code: {
        type: String,
        unique: true,
        trim: true
    },
    base_price: {
        type: Number,
        default: 0
    },
    description: String,
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

export default mongoose.model('Procedure', procedureSchema);