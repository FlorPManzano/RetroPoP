import getDb from '../../db/getDb.js';

const getSellerModel = async (id) => {
    let connection;

    try {
        connection = await getDb();

        // Localizamos al usuario con el email dado.
        const [products] = await connection.query(
            `SELECT P.id AS productId, P.productName, P.price, U.id AS userSellerId, U.username, U.email
            FROM products P
            JOIN users U ON P.userId = U.id
            WHERE P.id = ?`,
            [id]
        );
        return products;
    } finally {
        if (connection) connection.release();
    }
};

export default getSellerModel;
