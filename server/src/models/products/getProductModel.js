import getDb from '../../db/getDb.js';

const getProductModel = async (id) => {
    let connection;

    try {
        connection = await getDb();

        // Localizamos al usuario con el email dado.
        const products = await connection.query(
            `SELECT P.productName, P.description, P.category, P.state, P.place, P.price, P.image, P.createdAt, U.username, U.avatar, U.email,
            (SELECT COUNT(userSellerId) FROM reviews WHERE userSellerId = U.id) AS totalReviews,
            (SELECT AVG(starsRw) FROM reviews WHERE userSellerId = U.id) AS mediaStars
            FROM products P
            JOIN users U ON P.userId = U.id
            WHERE P.id = ?`,
            [id]
        );

        return products[0];
    } finally {
        if (connection) connection.release();
    }
};

export default getProductModel;
