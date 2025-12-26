import Joi from 'joi';

export const patientSchema = Joi.object({
    firstName: Joi.string().min(2).max(50).trim().required(),
    lastName: Joi.string().min(2).max(50).trim().required(),
    dni: Joi.string().regex(/^[0-9]{8}[A-Z]$/).message('El DNI debe tener 8 números y una letra'),
    email: Joi.string().email().lowercase().required(),
    phone: Joi.string().min(9).max(15),
    birthDate: Joi.date().less('now'),
    gender: Joi.string().valid('Masculino', 'Femenino', 'Otro')
});