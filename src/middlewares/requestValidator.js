export const validateBudgetUpdate = (req, res, next) => {
    const { status } = req.body;
    const validStatuses = ['DRAFT', 'SENT', 'ACCEPTED', 'REJECTED', 'PAID'];

    // Validación Si el campo no esta vacío
    if (!status) {
        return res.status(400).json({
            message: "Error de validación",
            details: "El campo 'status' es obligatirio"
        });
    }

    // Sanitizacion
    const cleanStatus = status.trim().replace(/\.$/, "").toUpperCase();

    // Validar usando lista validStatuses
    if (!validStatuses.includes(cleanStatus)) {
        return res.status(400).json({
            message: "Dato inválido",
            details: `${status} no es un estado válido. Use: ${validStatuses.join(', ')}`
        });
    }

    req.body.status = cleanStatus;
    next();
}