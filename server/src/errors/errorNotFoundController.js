// Importamos la funcion  de error.
import notFoundError from './errorService.js';

// Función controladora final que retorna un error 404.
const errorNotFoundErrorController = (req, res, next) => {
    next(errorNotFoundErrorController('ruta'));
};

export default errorNotFoundErrorController;
