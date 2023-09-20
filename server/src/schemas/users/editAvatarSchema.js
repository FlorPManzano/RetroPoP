// Importamos las dependencias.
import joi from 'joi';

// Importamos el objeto con los mensajes de error personalizados.
import joiErrorMessages from '../joiErrorMessages';

// Importamos el esquema de la imagen.
import imgSchema from '../imgSchema';

// Creamos el esquema de validación.
const editAvatarSchema = joi.object({
    avatar: imgSchema.required().messages(joiErrorMessages),
});

export default editAvatarSchema;
