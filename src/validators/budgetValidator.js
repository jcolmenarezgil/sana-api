import Joi from 'joi';

// Esquema para cada procedimiento individual dentro del array
const budgetItemSchema = Joi.object({
    id: Joi.string().alphanum().length(24).required().messages({
        'string.length': 'El ID del procedimiento deb ser un ObjectId de 24 caracteres'
    }),
    price: Joi.number().positive().required().messages({
        'number.length': 'El precio debe ser una valor mayor a 0'
    })
});

// Esquema principal del Presupuesto
export const budgetSchema = Joi.object({
    patient_id: Joi.string().alphanum().length(24).required(),
    selected_procedures: Joi.array().items(budgetItemSchema).min(1).required().messages({
        'array.min': 'El presupuesto debe incluir al menos un procedimiento'
    }),
    status: Joi.string().valid('DRAFT', 'SENT', 'ACCEPTED', 'REJECTED', 'PAID').default('DRAFT')
});