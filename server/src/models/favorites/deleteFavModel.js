import getDb from '../../db/getDb.js';

const deleteFavModel = async (productId) => {
    let connection;

    try {
        connection = await getDb();

        // Localizamos al usuario con el email dado.
        const [fav] = await connection.query(
            `DELETE FROM favorites WHERE productIdFav = ?`,
            [productId]
        );
        return fav;
    } finally {
        if (connection) connection.release();
    }
};

export default deleteFavModel;
