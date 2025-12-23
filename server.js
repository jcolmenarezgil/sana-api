import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import connectDB from './src/config/db.js';
import budgetRoutes from './src/routes/budgetRoutes.js'
import procedureRouter from './src/routes/procedureRoutes.js';
import patientRouter from './src/routes/patientRoutes.js';
import paymentRoutes from './src/routes/paymentRoutes.js';

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

export default app;

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server is Running at port ${port}`);
    });