import getDb from '../../db/getDb.js';

const setFavModel = async (userId, productId) => {
    let connection;

    try {
        connection = await getDb();

        // Comprobamos si existe el favorito
        const [favExist] = await connection.query(
            `SELECT * FROM favorites WHERE userIdFav = ? AND productIdFav = ?`,
            [userId, productId]
        );

        // Si existe, lo borramos
        if (favExist.length > 0) {
            await connection.query(
                `DELETE FROM favorites WHERE userIdFav = ? AND productIdFav = ?`,
                [userId, productId]
            );
            return 'Favorito borrado correctamente';
        }

        // Si no existe, lo creamos

        if (favExist.length === 0) {
            await connection.query(
                `INSERT INTO favorites (userIdFav, productIdFav) VALUES (?, ?)`,
                [userId, productId]
            );
            return 'Favorito añadido correctamente';
        }
    } finally {
        if (connection) connection.release();
    }
};

export default setFavModel;
