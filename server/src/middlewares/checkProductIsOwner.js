import checkProductIsOwnerModel from '../models/products/checkOwnerProductModel.js';

const checkProductIsOwner = async (req, res, next) => {
    try {
        console.log('que ostias lelga aquí', req.user, req.body);

        const product = await checkProductIsOwnerModel(
            req.body.productId,
            req.user
        );

        if (product.length > 0) {
            next();
        } else {
            res.send({
                status: 'error',
                message: 'No eres el propietario de este producto',
            });
        }
    } catch (err) {
        next(err);
    }
};

export default checkProductIsOwner;
