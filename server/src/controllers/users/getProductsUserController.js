import getProductsByUserModel from '../../models/users/getProductsByUserModel.js';
import selectUserByIdModel from '../../models/users/selectUserByIdModel.js';

const getProductsUserController = async (req, res, next) => {
    try {
        const id = req.params.id;

        const products = await getProductsByUserModel(id);
        const user = await selectUserByIdModel(id);

        res.send({
            status: 'ok',
            user: user ? user : 'No existe el usuario',
            products:
                products.length !== 0
                    ? products
                    : 'El usuario no tiene ningún producto a la venta',
        });
    } catch (err) {
        next(err);
    }
};

export default getProductsUserController;
