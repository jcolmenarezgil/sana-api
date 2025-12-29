import Joi from 'joi';

export const prescriptionSchema = Joi.object({
    patient_id: Joi.string().alphanum().length(24).required(),
    related_procedures: Joi.array().items(Joi.string().alphanum().length(24)).allow(null),
    medication: Joi.array().items(Joi.object({
        medicine_id: Joi.string().alphanum().length(24).required(),
        custom_dosage_form: Joi.string().trim().allow(''),
        custom_schedule: Joi.string().trim().allow(''),
        custom_instructions: Joi.string().trim().allow('')
    })).min(1).required()
});