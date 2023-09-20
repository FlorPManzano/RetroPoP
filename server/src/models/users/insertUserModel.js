// Importamos las dependencias.
import bcrypt from 'bcrypt';

// Importamos la función que nos permite obtener una conexión libre con la base de datos.
import getDb from '../../db/getDb.js';

import {
    emailAlreadyRegisteredError,
    userAlreadyRegisteredError,
} from '../../errors/errorService.js';

// Función que se conectará a la base de datos y creará un usuario.
const insertUserModel = async (username, email, password, registrationCode) => {
    let connection;

    try {
        connection = await getDb();

        // Buscamos en la base de datos algún usuario con ese email.
        let [users] = await connection.query(
            `SELECT id FROM users WHERE email = ?`,
            [email]
        );

        // Si existe algún usuario con ese email lanzamos un error.
        if (users.length > 0) {
            emailAlreadyRegisteredError();
        }

        // Buscamos en la base de datos algún usuario con el nombre dado.
        [users] = await connection.query(
            `SELECT id FROM users WHERE username = ?`,
            [username]
        );

        // Si existe algún usuario con ese nombre lanzamos un error.
        if (users.length > 0) {
            userAlreadyRegisteredError();
        }

        // Encriptamos la contraseña.
        const hashedPass = await bcrypt.hash(password, 10);

        // Creamos el usuario.

        await connection.query(
            'INSERT INTO users (email, username, password, registrationCode, createdAt) VALUES(?, ?, ?, ?, ?)',
            [email, username, hashedPass, registrationCode, new Date()]
        );
    } finally {
        if (connection) connection.release();
    }
};

// async function insertUserModel({
//     email,
//     username,
//     password,
//     registrationCode,
// }) {
//     let connection;

//     try {
//         connection = await getDb();

//         // Comprobamos si el email está repetido.
//         let user = await selectUserByIdModel({ email });

//         // Si el array de usuarios tiene más de 0 usuarios quiere decir que el email está repetido.
//         if (user) {
//             throw new Error('El email ya está registrado');
//         }

//         // Comprobamos si el nombre de usuario está repetido.
//         user = await selectUserByIdModel({ username });

//         // Si el array de usuarios tiene más de 0 usuarios quiere decir que el nombre de usuario está repetido.
//         if (user) {
//             throw new Error('El nombre de usuario ya está registrado');
//         }

//         // Insertamos el usuario en la base de datos.
//         const [result] = await connection.query(
//             'INSERT INTO users (email, username, password, registrationCode, createdAt) VALUES(?, ?, ?, ?, ?)',
//             [email, username, password, registrationCode, new Date()]
//         );
//         return await selectUserByIdModel({ id: result.insertId });
//     } catch (error) {
//         return { error: error.message };
//     } finally {
//         if (connection) connection.release();
//     }
// }

export default insertUserModel;
