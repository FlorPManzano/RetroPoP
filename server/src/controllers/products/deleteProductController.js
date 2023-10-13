import deleteProductModel from '../../models/products/deleteProductModel.js';

const deleteProductController = async (req, res, next) => {
    try {
        const product = await deleteProductModel(req.body.productId);

        res.send({
            status: 'ok',
            message: 'Producto eliminado correctamente',
        });
    } catch (err) {
        next(err);
    }
};

export default deleteProductController;
