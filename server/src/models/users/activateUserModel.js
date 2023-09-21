// Importamos la función que nos permite obtener una conexión libre con la base de datos.
import getDb from '../../db/getDb.js';

const activateUserModel = async (regCode) => {
    let connection;
    try {
        connection = await getDb();
        // Buscamos en la base de datos algún usuario con ese email.
        let [user] = await connection.query(
            `SELECT id FROM users WHERE email = ?`,
            [regCode]
        );
        // Si ya está activa la cuenta o el código es incorrecto lanzamos un error.
        if (user.length > 0) {
            throw new Error(
                'El usuario ya está activado o el código es incorrecto'
            );
        }
        console.log('Esto entra por aquí', regCode);
        // Validamos la cuenta
        await connection.query(
            `UPDATE users SET registrationCode = NULL, isActive = 1  WHERE registrationCode = ?`,
            [regCode]
        );
    } finally {
        if (connection) connection.release();
    }
};

export default activateUserModel;
