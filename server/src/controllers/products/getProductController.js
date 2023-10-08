// Importamos el model
import getProductModel from '../../models/products/getProductModel.js';

// Creamos la función del controlador
const getProductController = async (req, res, next) => {
    try {
        // Obtenemos el producto de la BBDD
        const product = await getProductModel(req.params.productId);
        // Devolvemos el producto
        res.send({
            status: product.length > 0 ? 'ok' : 'Error',
            // Funcion ternaria que devuelve el producto o un mensaje de que no existe el producto en caso de que venga un array vacio
            data: product.length > 0 ? product[0] : 'No existe ese producto',
        });
    } catch (err) {
        // Si hay un error, lo devolvemos
        next(err);
    }
};

export default getProductController;
