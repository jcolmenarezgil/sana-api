import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

// Import Routes
import budgetRoutes from './src/routes/budgetRoutes.js'

dotenv.config();
const app = express();

// Middlewares basics
app.use(cors());
app.use(express.json());

// Conexion con MongoDB
mongose.connect(process.env.MONGO_URI)
    .then(() => console.log("connection established successfully with MongoDB."))
    .catch((err) => console.error("Sorry, connection with DB is failed."))

// Add Routes
app.get('/', (req, res) => {
    res.json({ message: "Welcome SANA Api" });
});

app.use('/api/budgets', budgetRoutes);

const port = process.env.PORT || 3000;
app.listen(prrt, () => {
    console.log(`Server is Running at port ${port}`);
})