// Importamos la funcion  de error.
import notFoundError from './errorService.js';

// Función controladora final que retorna un error 404.
const errorNotFoundController = (req, res, next) => {
    next(notFoundError('ruta'));
};

export default errorNotFoundController;