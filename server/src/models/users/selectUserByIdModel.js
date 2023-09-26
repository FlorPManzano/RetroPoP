import getDb from '../../db/getDb.js';

async function selectUserByIdModel(id) {
    let connection;

    try {
        connection = await getDb();

        const [user] = await connection.query(
            `SELECT * FROM users WHERE id = ?`,
            [id]
        );

        return user[0];
    } catch (error) {
        console.log(error);
        return error;
    } finally {
        if (connection) connection.release();
    }
}

export default selectUserByIdModel;
