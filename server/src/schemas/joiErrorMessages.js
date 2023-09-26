// Configuracion de mensajes de error para Joi.
// Para que salgan en español
const joiErrorMessages = {
    'any.required': 'El campo "{#key}" es requerido',
    'any.only': 'Solo se permiten fotos jpeg o png',
    'number.base': 'El valor de "{#key}" debe ser un número',
    'number.integer': 'El valor de "{#key}" debe ser un número entero',
    'number.max': 'El archivo no debe exceder los 5 MB',
    'number.min': 'El valor de "{#key}" debe ser mayor o igual a 1',
    'object.base': 'El valor de "{#key}" debe ser un objeto',
    'object.unknown': 'No se permiten campos adicionales en este objeto',
    'string.base': 'El valor de "{#key}" debe ser una cadena',
    'string.email':
        'Debe proporcionar un correo electrónico válido para "{#key}"',
    'string.empty': 'El campo "{#key}" no debe estar vacío',
    'string.max': 'El campo "{#key}" no debe exceder los {#limit} caracteres',
    'string.min': 'El campo "{#key}" debe tener al menos {#limit} caracteres',

    'boolean.base': 'El campo "{#key}" debe ser un booleano',
    'date.greater': 'La fecha de entrega debe ser posterior a la actual',
    'entity.parse.failed': 'El campo "{#key}" debe ser un JSON válido',
    'string.pattern.base':
        'La contraseña debe contener al menos una mayúscula, una minúscula, un número y un símbolo de puntuación para "{#key}"',
};

export default joiErrorMessages;
