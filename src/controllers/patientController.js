import Patient from '../models/Patient.js';
import User from '../models/User.js';
import Consultation from '../models/Consultation.js';
import Prescription from '../models/Prescription.js';
import Budget from '../models/Budget.js';
import mongoose from 'mongoose';

export const createPatient = async (req, res) => {
    // Usamos una sesión para asegurar que si algo falla, no se cree ni el paciente ni el usuario
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { firstName, lastName, dni, birthDate, gender, phone } = req.body;

        // Crear el registro clínico del Paciente
        const newPatient = new Patient({
            firstName, lastName, dni, email, birthDate, gender, phone
        });
        const savedPatient = await newPatient.save({ session });

        // Crear el usuario de acceso para el Paciente
        const newUser = new User({
            name: `${firstName} ${lastName}`,
            email: email.toLowerCase(),
            password: dni, // la contraseña por defecto será el dni, TODO indicar mediante email para que la cambie
            role: 'PATIENT',
            patient_reference: savedPatient._id
        });
        await newUser.save({ session });

        // Vincular este paciente al Especialista que lo está creando
        const specialistId = req.user.id;
        await User.findByIdAndUpdate(
            specialistId,
            { $addToSet: { granted_access_to: savedPatient._id } },
            { session }
        );
        await session.commitTransaction();
        session.endSession();
    
        res.status(201).json({
            message: 'Paciente y Usuario creados correctamente',
            patient: savedPatient,
            access: {
                user_email: newUser.email,
                temporary_password: 'Su número de DNI'
            }
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        
        res.status(400).json({ message: error.message });
    }
};

export const getPatients = async (req, res) => {
    try {
        const patients = await Patient.find();
        res.json(patients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// GET FULL
export const getFullPatientHistory = async (req, res) => {
    try {
        const { id } = req.params;

        // Ejecutamos todas las consultas en paralelo para máxima velocidad
        const [patient, consultations, prescriptions, budgets] = await Promise.all([
            Patient.findById(id),
            Consultation.find({ patient_id: id }).sort({ date: -1 }),
            Prescription.find({ patient_id: id })
                .populate('patient_id', 'birthDate')
                .populate('medication.medicine_id', 'name generic_name')
                .sort({ date_issued: -1 }),
            Budget.find({ patient_id: id }).sort({ createdAt: -1 })
        ]);

        if (!patient) {
            return res.status(404).json({ message: "Paciente no encontrado" });
        }

        // Calculamos balance total (Deuda acumulada de todos sus presupuestos)
        const totalDebt = budgets.reduce((acc, budget) => acc + budget.balance_due, 0);

        res.status(200).json({
            patient,
            summary: {
                total_consultations: consultations.length,
                total_prescriptions: prescriptions.length,
                pending_balance: totalDebt
            },
            history: {
                consultations,
                prescriptions,
                budgets
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};