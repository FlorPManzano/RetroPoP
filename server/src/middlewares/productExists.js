import getProductModel from '../models/products/getProductModel.js';
import { productDoesNotExistError } from '../errors/errorService.js';

const productExists = async (req, res, next) => {
    try {
        // Variable que almacenará el resultado de la consulta a la base de datos
        const product = await getProductModel(req.body.idProduct);
        // Creamos un nuevo campo en el objeto req.user con los datos del usuario
        // req.user = user;
        if (product.length === 0) productDoesNotExistError();
        next();
    } catch (error) {
        next(error);
    }
};

export default productExists;
