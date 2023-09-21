import insertUserModel from '../../models/users/insertUserModel.js';

const createUserController = async (req, res, next) => {
    try {
        // Validamos los datos con Joi.
        // await validateSchema(newUserSchema, req.body);

        // Importamos los datos del body.
        const { username, email, password } = req.body;

        // Insertamos el usuario.
        await insertUserModel(username, email, password);

        res.send({
            status: 'ok',
            message: 'Usuario creado',
        });
    } catch (err) {
        // Aquí hemos sustituido next(err) por res.send(err) porque no tenemos un middleware de errores.
        res.send(err);
    }
};

export default createUserController;
