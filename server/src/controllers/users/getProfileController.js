import selectUserByIdModel from '../../models/users/selectUserByIdModel.js';

const getProfileController = async (req, res, next) => {
    try {
        const user = await selectUserByIdModel(req.user);

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
            },
        });
    } catch (err) {
        // Aquí hemos sustituido next(err) por res.send(err) porque no tenemos un middleware de errores.
        next(err);
    }
};

export default getProfileController;
