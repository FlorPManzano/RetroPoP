// Importamos las dependencias.
import joi from 'joi';

// Importamos el objeto con los mensajes de error personalizados.
import joiErrorMessages from '../joiErrorMessages.js';

// Creamos el esquema de validación.
const newBookingSchema = joi.object({
    deliveryPlace: joi.string().required().messages(joiErrorMessages),
    deliverytime: joi
        .date()
        .greater('now')
        .required()
        .messages(joiErrorMessages),
});

export default newBookingSchema;
