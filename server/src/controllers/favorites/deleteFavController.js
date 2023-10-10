import deleteFavModel from '../../models/favorites/deleteFavModel.js';

const deleteFavController = async (req, res) => {
    try {
        const productId = req.body.productId;
        const deleteFav = await deleteFavModel(productId);

        res.send({
            status: 'ok',
            message: 'Fav borrado',
        });
    } catch (err) {
        res.send(err);
    }
};

export default deleteFavController;
