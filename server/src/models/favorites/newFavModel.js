import getDb from '../../db/getDb.js';

const newFavModel = async (userId, productId) => {
    let connection;

    try {
        connection = await getDb();

        // Localizamos al usuario con el email dado.
        const [fav] = await connection.query(
            `INSERT INTO favorites (userIdFav, productIdFav) VALUES (?, ?)`,
            [userId, productId]
        );
        return fav;
    } finally {
        if (connection) connection.release();
    }
};

export default newFavModel;
