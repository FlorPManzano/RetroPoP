// importamos las dependencias
import jwt from 'jsonwebtoken';

// importamos las funciones de error
import {
    notAuthenticatedError,
    invalidTokenError,
} from '../errors/errorService.js';

// Función controladora intermedia que comprueba si el usuario está logueado y crea
// la propiedad user en el objeto request.
const authUser = async (req, res, next) => {
    try {
        // Obtenemos el token de la cabecera de la petición.
        const { authorization } = req.headers;

        if (!authorization) {
            notAuthenticatedError();
        }
        try {
            // Variable que almacenará la información del token una vez desencriptado.
            const userInfoID = jwt.verify(authorization, process.env.SECRET).id;

            // Agregamos una nueva propiedad inventada por nosotros al objeto "request".
            req.user = userInfoID;

            // Pasamos el control a la siguiente función controladora.
            next();
        } catch (err) {
            console.error(err);
            invalidTokenError();
        }
    } catch (err) {
        next(err);
    }
};

export default authUser;
