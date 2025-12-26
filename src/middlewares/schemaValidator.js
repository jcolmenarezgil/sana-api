export const validateSchema = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body, { abortEarly: false, stripUnknow: true });

        if (error) {
            return res.status(400).json({
                message: "Error de validación de datos",
                details: error.details.map(d => d.message)
            });
        }

        req.body = value;
        next();
    };
};