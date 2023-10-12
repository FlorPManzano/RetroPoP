import setFavModel from '../../models/favorites/setFavModel.js';

const setFavController = async (req, res) => {
    try {
        const userId = req.user;
        const productId = req.body.idProduct;

        const fav = await setFavModel(userId, productId);

        console.log(fav);

        res.send({
            status: 'ok',
            message: fav,
        });
    } catch (err) {
        res.send(err);
    }
};

export default setFavController;
