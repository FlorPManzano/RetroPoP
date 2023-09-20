// Importamos las dependencias.
import joi from 'joi';

// Importamos el objeto con los mensajes de error personalizados.
import joiErrorMessages from './joiErrorMessages';

// Creamos un esquema para validar imágenes tanto del avatar del usuario como de los productos.
const imgSchema = joi
    .object({
        name: joi.string().required().messages(joiErrorMessages),
        mimetype: joi
            .string()
            .valid('image/jpeg', 'image/png')
            .required()
            .messages(joiErrorMessages),
        size: joi.number().max(5000000).required().messages(joiErrorMessages),
    })
    .unknown(true);

export default imgSchema;
