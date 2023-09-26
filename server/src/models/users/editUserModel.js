import getDb from '../../db/getDb.js';

//Aquí va el code del model para editar el avatar del usuario
const editUserModel = async (userId, bio = null, photoName = null) => {
    // Declaramos la conexión fuera del try/catch para poder usarla en el finally
    let connection;

    try {
        // Obtenemos la conexión a la base de datos.
        connection = await getDb();

        // Actualizamos el avatar del usaurio con su fecha de modificación.
        await connection.query(
            'UPDATE users SET bio = ?, avatar = ? WHERE id = ?',
            [bio, photoName, userId]
        );
    } catch (error) {
        console.log(error);
        return error;
    } finally {
        if (connection) connection.release();
    }
};

export default editUserModel;
