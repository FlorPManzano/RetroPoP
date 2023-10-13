// Importamos las dependencias
import jwt from 'jsonwebtoken';

// Importamos la variable de entorno SECRET
import { SECRET } from '../../../config.js';

// Importamos los modelos.
import selectUserModel from '../../models/users/selectUserModel.js';

// Importamos la función que valida los esquemas.
import validateSchema from '../../utils/validateSchema.js';

// Importamos el esquema de Joi.
import loginUserSchema from '../../schemas/users/loginUserSchema.js';

// Importamos las funciones de error.
import {
    invalidCredentialsError,
    userNotActivatedError,
} from '../../errors/errorService.js';
import { comparePasswords } from '../../helpers/encripters.js';

// Función controladora final que logea a un usuario.
const loginUserController = async (req, res, next) => {
    try {
        // Obtenemos los datos necesarios del body.
        const { email, password } = req.body;

        // Validamos los datos del body con joi.
        await validateSchema(loginUserSchema, req.body);

        // Obtenemos los datos del usuario.
        const user = await selectUserModel(email);

        //Comprobamos si el usuario está activo.

        if (!user.isActive) userNotActivatedError();

        // Comprobamos si la contraseña que ha insertado el usuario es correcta.

        const validPass = await comparePasswords(password, user.password);

        // Si la contraseña no coincide lanzamos un error.
        if (!validPass) {
            invalidCredentialsError();
        }
        // Generamos un objeto con la información que queramos agregar al token.
        const tokenInfo = {
            id: user.id,
            username: user.username,
        };

        // Generamos el token.
        const token = jwt.sign(tokenInfo, SECRET, {
            expiresIn: '7d',
        });

        res.send({
            status: 'ok',
            data: {
                username: user.username,
                token,
            },
        });
    } catch (err) {
        next(err);
    }
};

export default loginUserController;
