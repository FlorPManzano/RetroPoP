import getDb from '../../db/getDb';

async function selectUserByIdModel(obj) {
    const queryStr = Object.entries(obj)
        .map((arr) => `${arr[0]} = '${arr[1]}'`)
        .join(', ');
    let connection;

    try {
        connection = await getDb();

        const [user] = await connection.query(
            `SELECT * FROM users WHERE ${queryStr}`
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
