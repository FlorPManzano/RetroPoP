import getDb from '../../db/getDb.js';
import selectUserByIdModel from './selectUserByIdModel.js';

async function insertUserModel({
    email,
    username,
    password,
    registrationCode,
}) {
    let connection;

    try {
        connection = await getDb();

        // Comprobamos si el email está repetido.
        let user = await selectUserByIdModel({ email });

        // Si el array de usuarios tiene más de 0 usuarios quiere decir que el email está repetido.
        if (user) {
            throw new AuthError({
                message: 'Ya existe un usuario con ese email',
            });
        }

        // Comprobamos si el nombre de usuario está repetido.
        user = await selectUserByIdModel({ username });

        // Si el array de usuarios tiene más de 0 usuarios quiere decir que el nombre de usuario está repetido.
        if (user) {
            throw new AuthError({ message: 'Nombre de usuario no disponible' });
        }

        // Insertamos el usuario en la base de datos.
        const [result] = await connection.query(
            'INSERT INTO users (email, username, password, registrationCode, createdAt) VALUES(?, ?, ?, ?, ?)',
            [email, username, password, registrationCode, new Date()]
        );
        return await selectUserByIdModel({ id: result.insertId });
    } catch (error) {
        console.log(error);
        return error;
    } finally {
        if (connection) connection.release();
    }
}

export default insertUserModel;
