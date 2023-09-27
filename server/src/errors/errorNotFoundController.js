import { notFoundError } from '../errors/errorService.js';

// Función controladora final que retorna un error 404.
const errorNotFoundController = (req, res, next) => {
    next(notFoundError('ruta'));
};

export default errorNotFoundController;
