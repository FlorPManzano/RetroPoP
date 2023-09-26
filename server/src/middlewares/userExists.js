import { userNotFoundError } from '../errors/errorService.js';
import selectUserByIdModel from '../models/users/selectUserByIdModel.js';

const usersExists = async (req, res, next) => {
    try {
        // Variable que almacenará el resultado de la consulta a la base de datos
        const user = await selectUserByIdModel(req.user);
        if (!user) userNotFoundError();
        // Creamos un nuevo campo en el objeto req.user con los datos del usuario
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
};

export default usersExists;
