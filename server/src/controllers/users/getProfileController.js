import selectUserByIdModel from '../../models/users/selectUserByIdModel.js';
import getFavModel from '../../models/favorites/getFavModel.js';

const getProfileController = async (req, res, next) => {
    try {
        const user = await selectUserByIdModel(req.user);
        const favs = await getFavModel(req.user);
        const arrayFavs = [...favs.map((fav) => fav.productIdFav)];

        const obj = {
            id: user.id,
            email: user.email,
            username: user.username,
            avatar: user.avatar,
            bio: user.bio,
            createdAt: user.createdAt,
            isActive: user.isActive,
            favs: [...arrayFavs.sort()],
        };
        console.log('iiiii', favs);

        console.log('eeeeeee', obj);

        res.send({
            status: 'ok',
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                avatar: user.avatar,
                bio: user.bio,
                createdAt: user.createdAt,
                isActive: user.isActive,
                favs: [...arrayFavs.sort()],
            },
        });
    } catch (err) {
        // Aquí hemos sustituido next(err) por res.send(err) porque no tenemos un middleware de errores.
        next(err);
    }
};

export default getProfileController;
