import Joi from "joi";

export const medicineSchema = Joi.object({
    name: Joi.string()
        .min(2)
        .max(100)
        .trim()
        .required()
        .messages({
            'string.empty': 'El nombre comercial de la medicina es obigatoria'
        }),
    
    generic_name: Joi.string()
        .min(2)
        .max(100)
        .trim()
        .allow(''),
    
    category: Joi.string()
        .required()
        .messages({
            'any.required': 'La categoria es obligatoria. (ej. Antibióticos, Analgesicos, etc.)'
        }),
    
    default_dosage: Joi.string()
        .min(2)
        .max(100)
        .trim()
        .required()
        .messages({
            'any.required': 'Debes indicar una presentación por defecto (ej. Tabletas 500mg)'
        }),
    
    default_schedule: Joi.string()
        .min(2)
        .max(100)
        .trim()
        .required()
        .messages({
            'any.required': 'Debes indicar un horario de toma por defecto (ej. Cada 8 horas)'
        }),
    
    default_instructions: Joi.string()
        .max(500)
        .trim()
        .allow(''),
        
    contraindicated: Joi.string()
        .max(500)
        .trim()
        .allow('')
});