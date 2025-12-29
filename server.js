import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import connectDB from './src/config/db.js';
import budgetRoutes from './src/routes/budgetRoutes.js'
import procedureRouter from './src/routes/procedureRoutes.js';
import patientRouter from './src/routes/patientRoutes.js';
import paymentRoutes from './src/routes/paymentRoutes.js';
import consultationRoutes from './src/routes/consultationRoutes.js';
import medicineRoutes from './src/routes/medicineRoutes.js';
import prescriptionRoutes from './src/routes/prescriptionRoutes.js';

dotenv.config();
const app = express();

// Middlewares basics
app.use(cors());
app.use(express.json());

app.use(async (req, res, next) => {
    await connectDB();
    next();
})

// Add Routes
app.get('/', (req, res) => {
    res.json({ message: "Welcome SANA Api" });
});

app.use('/api/patients', patientRouter);
app.use('/api/budgets', budgetRoutes);
app.use('/api/procedure', procedureRouter);
app.use('/api/payments', paymentRoutes);
app.use('/api/consultations', consultationRoutes);
app.use('/api/medicines/', medicineRoutes);
app.use('/api/prescriptions', prescriptionRoutes);

// Manejo de errores 400
app.use((req, res, next) => {
    res.status(404).json({ message: "La ruta solicitada no existe." });
});

// Manejo de erorres 500
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: "Ocurrió un error inesperado en el servidor",
        error: process.env.NODE_ENV === 'development' ? err.message : {}
    });
});

export default app;

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is Running at port ${port}`);
});