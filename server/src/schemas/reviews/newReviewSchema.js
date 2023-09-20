// Importamos las dependencias.
import joi from 'joi';

// Importamos el objeto con los mensajes de error personalizados.
import joiErrorMessages from '../joiErrorMessages.js';

// Creamos el esquema de validación.
const newReviewSchema = joi.object({
    titleRw: joi.string().max(100).required().messages(joiErrorMessages),
    textRw: joi.string().max(200).required().messages(joiErrorMessages),
    starsRw: joi
        .string()
        .valid('1', '2', '3', '4', '5')
        .required()
        .messages(joiErrorMessages),
});

export default newReviewSchema;
