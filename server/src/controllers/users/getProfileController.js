import selectUserByIdModel from '../../models/users/selectUserByIdModel.js';

const getProfileController = async (req, res, next) => {
    try {
        console.log('QUE OSTIAS LELGA AQUÍ', req.user);
        const user = await selectUserByIdModel(req.user);

        res.send({
            status: 'ok',
            user,
        });
    } catch (err) {
        // Aquí hemos sustituido next(err) por res.send(err) porque no tenemos un middleware de errores.
        next(err);
    }
};

export default getProfileController;
