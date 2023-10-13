import getFavModel from '../../models/favorites/getFavModel.js';

const getFavController = async (req, res) => {
    try {
        const userId = req.user;

        const favs = await getFavModel(userId);

        const array = [...favs.map((fav) => fav.productIdFav)];

        res.send({
            status: 'ok',
            array: [...array.sort()],
        });
    } catch (err) {
        res.send(err);
    }
};

export default getFavController;
