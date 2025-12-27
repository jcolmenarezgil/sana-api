import Joi, { required } from 'joi';

export const consultationSchema = Joi.object({
    patient_id: Joi.string().alphanum().length(24) / required(),
    reason: Joi.string().min(5).max(150).required(),
    diagnosis: Joi.string().allow(''),
    notes: Joi.string().min(10).required(),
    price: Joi.number().min(0).default(0),
    status: Joi.string().valid('PENDING', 'COMPLETED', 'CANCELED')
});