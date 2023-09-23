import activateUserModel from '../../models/users/activateUserModel.js';

const activateUserController = async (req, res, next) => {
    try {
        // Importamos el código de activación que nos envia el user.
        const activateCodeParam = req.params.regCode;

        // Llamamos a la función que se encarga de validar la cuenta.
        await activateUserModel(activateCodeParam);

        res.send({
            status: 'ok',
            message: 'Cuenta activada correctamente',
        });
    } catch (err) {
        // Aquí hemos sustituido next(err) por res.send(err) porque no tenemos un middleware de errores.
        next(err);
    }
};

export default activateUserController;
