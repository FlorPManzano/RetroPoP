// Importamos las dependencias.
import joi from 'joi';

import imgSchema from '../imgSchema.js';

// Importamos el objeto con los mensajes de error personalizados.
import joiErrorMessages from '../joiErrorMessages.js';

// Creamos el esquema de validación.

const editUserSchema = joi.object({
    bio: joi.string().allow(null, '').max(200).messages(joiErrorMessages),
    avatar: imgSchema.messages(joiErrorMessages),
});
// .or('bio', 'avatar');

export default editUserSchema;
