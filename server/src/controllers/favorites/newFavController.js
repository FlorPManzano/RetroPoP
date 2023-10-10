import newFavModel from '../../models/favorites/newFavModel.js';

const newFavController = async (req, res) => {
    try {
        const userId = req.user;
        const productId = req.body.productId;

        const fav = await newFavModel(userId, productId);

        res.send({
            status: 'ok',
            message: 'Fav añadido',
        });
    } catch (err) {
        res.send(err);
    }
};

export default newFavController;
