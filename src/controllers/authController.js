import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verificar si el usuario existe
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: "Credenciales inválidas" });

        // Verficar contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Credenciales inválidas" });
       
        // Crear el Token (Válido por 24 horas)
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({ token, user: { name: user.name, role: user.role } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};