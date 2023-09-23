import getListProductsModel from '../../models/products/getListProductsModel.js';

const getListProductsController = async (req, res, next) => {
    try {
        const products = await getListProductsModel();

        res.send({
            status: 'ok',
            data: products,
        });
    } catch (err) {
        next(err);
    }
};

export default getListProductsController;
