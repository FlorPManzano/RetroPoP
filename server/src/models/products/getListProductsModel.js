import getDb from '../../db/getDb.js';

const getListProductsModel = async () => {
    let connection;

    try {
        connection = await getDb();

        const products = await connection.query(
            `SELECT P.id, P.productName, P.description, P.category, P.state, P.place, P.price, P.image, P.createdAt, U.id AS userId, U.username, U.avatar,
            (SELECT COUNT(userSellerId) FROM reviews WHERE userSellerId = U.id) AS totalReviews,
            (SELECT AVG(starsRw) FROM reviews WHERE userSellerId = U.id) AS mediaStars
            FROM products P
            JOIN users U ON P.userId = U.id`
        );

        return products[0];
    } finally {
        if (connection) connection.release();
    }
};

export default getListProductsModel;
