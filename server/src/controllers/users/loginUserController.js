// Importamos las dependencias
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// Importamos los modelos.
import selectUserByEmailModel from '../../models/users/selectUserByEmailModel.js';

// Importamos la función que valida los esquemas.
import validateSchema from '../../utils/validateSchema';

// Importamos el esquema de Joi.
import loginUserSchema from '../../schemas/users/loginUserSchema';

// Importamos las funciones de error.
import { invalidCredentialsError } from '../../services/errorService';

// Función controladora final que logea a un usuario.
const loginUserController = async (req, res, next) => {
    try {
        // Obtenemos los datos necesarios del body.
        const { email, password } = req.body;

        // Validamos los datos del body con joi.
        await validateSchema(loginUserSchema, req.body);

        // Obtenemos los datos del usuario.
        const user = await selectUserByEmailModel(email);

        // Comprobamos si la contraseña que ha insertado el usuario es correcta.
        const validPass = await bcrypt.compare(password, user.password);

        // Si la contraseña no coincide lanzamos un error.
        if (!validPass) {
            invalidCredentialsError();
        }

        // Generamos un objeto con la información que queramos agregar al token.
        const tokenInfo = {
            id: user.id,
        };

        // Generamos el token.
        const token = jwt.sign(tokenInfo, process.env.SECRET, {
            expiresIn: '7d',
        });

        res.send({
            status: 'ok',
            data: {
                token,
            },
        });
    } catch (err) {
        next(err);
    }
};

export default loginUserController;
