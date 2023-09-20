import getDb from '../../db/getDb';

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
        let user = await getUserBy({ email });

        // Si el array de usuarios tiene más de 0 usuarios quiere decir que el email está repetido.
        if (user) {
            throw new AuthError({
                message: 'Ya existe un usuario con ese email',
            });
        }

        // Comprobamos si el nombre de usuario está repetido.
        user = await getUserBy({ username });

        // Si el array de usuarios tiene más de 0 usuarios quiere decir que el nombre de usuario está repetido.
        if (user) {
            throw new AuthError({ message: 'Nombre de usuario no disponible' });
        }

        // Insertamos el usuario en la base de datos.
        const [result] = await connection.query(
            'INSERT INTO users (email, username, password, registrationCode, createdAt) VALUES(?, ?, ?, ?, ?)',
            [email, username, password, registrationCode, new Date()]
        );
        return await getUserBy({ id: result.insertId });
    } catch (error) {
        console.log(error);
        return error;
    } finally {
        if (connection) connection.release();
    }
}

export default insertUserModel;
