import { generateCode, hashPassword } from '../../helpers/helpers.js';
import insertUserModel from '../../models/users/insertUserModel.js';
import sendMail from '../../services/sendMail.js';

const createUserController = async (req, res, next) => {
    try {
        // Validamos los datos con Joi.
        // await validateSchema(newUserSchema, req.body);

        // Importamos los datos del body.
        const { username, email, password } = req.body;

        // Generamos un código de registro.
        const registrationCode = generateCode();

        // Insertamos el usuario.
        await insertUserModel(username, email, password, registrationCode);

        // Enviamos el email de activación.
        sendMail(username, email, registrationCode);

        res.send({
            status: 'ok',
            message: 'Usuario creado, por favor revisa tu email para activarlo',
        });
    } catch (err) {
        // Aquí hemos sustituido next(err) por res.send(err) porque no tenemos un middleware de errores.
        res.send(err);
    }
};

export default createUserController;
