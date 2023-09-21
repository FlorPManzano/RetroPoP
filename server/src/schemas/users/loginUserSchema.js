// Importamos las dependencias.
import joi from 'joi';

// Importamos el objeto con los mensajes de error personalizados.
import joiErrorMessages from '../joiErrorMessages.js';

// Creamos el esquema de validación.
const loginUserSchema = joi.object({
    email: joi.string().email().required().messages(joiErrorMessages),
    password: joi.string().required().messages(joiErrorMessages),
});

export default loginUserSchema;
