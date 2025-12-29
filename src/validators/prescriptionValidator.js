import Joi from 'joi';

export const prescriptionSchema = Joi.object({
    patient_id: Joi.string().alphanum().length(24).required(),
    related_procedures: Joi.array().items(Joi.string().alphanum().length(24)),
    medications: Joi.array().items(Joi.object({
        medicine_id: Joi.string().alphanum().length(24).required(),
        dosage_form: Joi.string().required(),
        schedule: Joi.string().required(),
        instructions: Joi.string().allow('')
    })).min(1).required()
});