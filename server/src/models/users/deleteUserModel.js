// Importamos la función que nos permite obtener una conexión libre con la base de datos.
import getDb from '../../db/getDb.js';

const deleteUserModel = async (id) => {
    let connection;

    try {
        connection = await getDb();

        await connection.query(`DELETE FROM users WHERE id = ?`, [id]);
    } finally {
        if (connection) connection.release();
    }
};

export default deleteUserModel;
