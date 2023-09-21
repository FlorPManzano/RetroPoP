// Importamos la función que nos permite obtener una conexión a la base de datos.
import getDb from '../../db/getDb.js';

// Importamos las funciones de error.
import { invalidCredentialsError } from '../../errors/errorService.js';

// Función que se conectará a la base de datos y devolverá los datos de un usuario.
const selectUserByEmailModel = async (email) => {
    let connection;

    try {
        connection = await getDb();

        // Localizamos al usuario con el email dado.
        const [users] = await connection.query(
            `SELECT id, password FROM users WHERE email = ?`,
            [email]
        );

        // Si no hay ningún usuario con ese email lanzamos un error.
        if (users.length < 1) {
            invalidCredentialsError();
        }

        // Como solo puede haber un usuario con ese email
        //devolvemos el primer elemento del array que nos devuelve la consulta.
        return users[0];
    } finally {
        if (connection) connection.release();
    }
};

export default selectUserByEmailModel;
