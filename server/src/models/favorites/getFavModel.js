import getDb from '../../db/getDb.js';

const getFavModel = async (userId) => {
    console.log('holiii', userId);
    let connection;

    try {
        connection = await getDb();

        // Localizamos al usuario con el email dado.
        const [favs] = await connection.query(
            `SELECT * FROM favorites WHERE userIdFav = ?`,
            [userId]
        );
        return favs;
    } finally {
        if (connection) connection.release();
    }
};

export default getFavModel;
