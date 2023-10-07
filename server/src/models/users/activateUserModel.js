// Importamos la función que nos permite obtener una conexión libre con la base de datos.
import getDb from '../../db/getDb.js';

const activateUserModel = async (regCode) => {
    let connection;
    try {
        connection = await getDb();
        // Buscamos en la base de datos algún usuario con ese regCode
        let [user] = await connection.query(
            `SELECT id, username FROM users WHERE registrationCode = ?`,
            [regCode]
        );
        // Si ya está activa la cuenta o el código es incorrecto lanzamos un error.
        if (user.length === 0) {
            throw new Error(
                'El usuario ya está activado o el código es incorrecto'
            );
        }
        // Validamos la cuenta
        let [regUser] = await connection.query(
            `UPDATE users SET registrationCode = NULL, isActive = 1  WHERE registrationCode = ?`,
            [regCode]
        );

        return user[0];
    } finally {
        if (connection) connection.release();
    }
};

export default activateUserModel;
