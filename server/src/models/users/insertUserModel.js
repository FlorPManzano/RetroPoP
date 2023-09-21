// Importamos las dependencias.
import bcrypt from 'bcrypt';
import crypto from 'node:crypto';

// Importamos la función que nos permite obtener una conexión libre con la base de datos.
import getDb from '../../db/getDb.js';

import sendMail from '../../services/sendMail.js';

import {
    emailAlreadyRegisteredError,
    userAlreadyRegisteredError,
} from '../../errors/errorService.js';

// Función que se conectará a la base de datos y creará un usuario.
const insertUserModel = async (username, email, password) => {
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

        // Creamos un código de registro.
        const registrationCode = crypto.randomUUID();

        // Creamos el usuario.

        await connection.query(
            'INSERT INTO users (email, username, password, registrationCode) VALUES(?, ?, ?, ?)',
            [email, username, hashedPass, registrationCode]
        );
        sendMail(username, email, registrationCode);
    } finally {
        if (connection) connection.release();
    }
};

export default insertUserModel;
