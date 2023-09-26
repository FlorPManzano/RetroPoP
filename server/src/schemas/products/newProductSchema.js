// Importamos las dependencias.
import joi from 'joi';

// Importamos el objeto con los mensajes de error personalizados.
import joiErrorMessages from '../joiErrorMessages.js';

// Importamos el esquema de la imagen.
import imgSchema from '../imgSchema.js';

// Creamos el esquema de validación.
const newProductSchema = joi.object({
    productName: joi.string().required().messages(joiErrorMessages),
    image: imgSchema.required().messages(joiErrorMessages),
    description: joi.string().max(200).required().messages(joiErrorMessages),
    price: joi.number().required().messages(joiErrorMessages),
    category: joi.string().required().messages(joiErrorMessages),
    state: joi.string().required().messages(joiErrorMessages),
    place: joi.string().max(30).required().messages(joiErrorMessages),
});

export default newProductSchema;
