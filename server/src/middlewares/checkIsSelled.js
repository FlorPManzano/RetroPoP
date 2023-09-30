import getProductModel from '../models/products/getProductModel.js';

const checkIsSelled = async (req, res, next) => {
    try {
        const { idProduct } = req.body;
        const isSelled = await getProductModel(idProduct);
        console.log('WTFFFFF', isSelled);
        if (isSelled[0].isSelled === 1) {
            res.send({
                status: 'ok',
                message: 'Este producto ya está vendido',
            });
        }

        next();
    } catch (error) {
        next(error);
    }
};

export default checkIsSelled;
