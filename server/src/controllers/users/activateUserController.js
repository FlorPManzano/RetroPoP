// Importamos las dependencias
import jwt from 'jsonwebtoken';

// Importamos la variable de entorno SECRET
import { SECRET } from '../../../config.js';

import activateUserModel from '../../models/users/activateUserModel.js';

const activateUserController = async (req, res, next) => {
    try {
        // Importamos el código de activación que nos envia el user.
        const activateCodeParam = req.params.regCode;

        // Llamamos a la función que se encarga de validar la cuenta.
        const userActivate = await activateUserModel(activateCodeParam);

        console.log('QUE ES ESTOOOOOOOO', userActivate);

        if (userActivate === undefined) {
            throw new Error(
                'El usuario ya está activado o el código es incorrecto'
            );
        }

        const tokenInfo = {
            id: userActivate.id,
            username: userActivate.username,
        };

        const token = jwt.sign(tokenInfo, SECRET, {
            expiresIn: '7d',
        });

        res.send({
            status: 'ok',
            message: 'Cuenta activada correctamente',
            token,
        });
    } catch (err) {
        // Aquí hemos sustituido next(err) por res.send(err) porque no tenemos un middleware de errores.
        next(err);
    }
};

export default activateUserController;
