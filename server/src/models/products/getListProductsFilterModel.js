import getDb from '../../db/getDb.js';

const getListProductsFilterModel = async (params) => {
    let connection;

    try {
        connection = await getDb();

        const products = await connection.query(
            `SELECT P.id, P.productName, P.description, P.category, P.state, P.place, P.price, P.image, P.createdAt, U.id AS userId, U.username, U.avatar,
            (SELECT COUNT(userSellerId) FROM reviews WHERE userSellerId = U.id) AS totalReviews,
            (SELECT AVG(starsRw) FROM reviews WHERE userSellerId = U.id) AS mediaStars
            FROM products P
            JOIN users U ON P.userId = U.id
            WHERE P.productName LIKE ? AND P.category LIKE ? AND P.place LIKE ? AND P.price >= ? AND P.price <= ?`,
            [
                params.name,
                params.category,
                params.place,
                params.minPrice,
                params.maxPrice,
            ]
        );

        return products[0];
    } finally {
        if (connection) connection.release();
    }
};

export default getListProductsFilterModel;

// getListProductsFilterModel;
//
