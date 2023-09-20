// Importamos las dependencias.
import joi from 'joi';

// Importamos el objeto con los mensajes de error personalizados.
import joiErrorMessages from '../joiErrorMessages';

// Creamos el esquema de validación.

const editBioSchema = joi.object({
    bio: joi.string().max(200).messages(joiErrorMessages),
});

export default editBioSchema;
