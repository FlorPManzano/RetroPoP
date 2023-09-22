// Importamos los helpers.
import { generateCode, hashPassword } from '../../helpers/encripters.js';
// Importamos los modelos.
import insertUserModel from '../../models/users/insertUserModel.js';
import validateSchema from '../../utils/validateSchema.js';
import newUserSchema from '../../schemas/users/newUserSchema.js';
import sendMail from '../../services/sendMail.js';

const createUserController = async (req, res, next) => {
    try {
        // Importamos los datos del body.
        const { username, email, password } = req.body;

        // Validamos los datos con Joi.
        await validateSchema(newUserSchema, req.body);

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
        const msgErr = { message: err.details[0].message };
        res.send(msgErr);
    }
};

export default createUserController;
