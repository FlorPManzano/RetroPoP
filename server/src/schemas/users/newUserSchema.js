// Importamos las dependencias.
import joi from 'joi';

// Importamos el objeto con los mensajes de error personalizados.
import joiErrorMessages from '../joiErrorMessages.js';

// Creamos el esquema de validación.
const newUserSchema = joi.object({
    username: joi.string().required().messages(joiErrorMessages),
    email: joi.string().email().required().messages(joiErrorMessages),
    password: joi
        .string()
        .min(8)
        .max(100)
        .regex(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[¡!$%^&*()_+|~=`{}:";'<>¿?,.])[a-zA-Z0-9¡!$%^&*()_+|~=`{}:";'<>¿?,.]{8,}$/
        )
        .required()
        .messages(joiErrorMessages),
});

export default newUserSchema;
