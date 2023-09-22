import getListProductsModel from '../../models/products/getListProductsModel.js';

const getListProducsController = async (req, res) => {
    try {
        const products = await getListProductsModel();

        res.send({
            status: 'ok',
            data: products,
        });
    } catch (err) {
        res.send({
            status: 'error',
            message: err.message,
        });
    }
};

export default getListProducsController;
