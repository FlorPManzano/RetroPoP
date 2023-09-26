// Importamos las dependencias.
import joi from 'joi';

// Importamos el objeto con los mensajes de error personalizados.
import joiErrorMessages from '../joiErrorMessages.js';

// Creamos el esquema de validación.
const newBookingSchema = joi.object({
    confirm: joi.boolean().required().messages(joiErrorMessages),
    deliveryPlace: joi.string().required().messages(joiErrorMessages),
    deliveryTime: joi
        .date()
        .greater('now')
        .required()
        .messages(joiErrorMessages),
});

export default newBookingSchema;
