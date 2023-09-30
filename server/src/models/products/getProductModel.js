import getDb from '../../db/getDb.js';

const getProductModel = async (id) => {
    let connection;

    try {
        connection = await getDb();

        // Localizamos al usuario con el email dado.
        const [products] = await connection.query(
            `SELECT P.id, P.productName, P.description, P.category, P.state, P.place, P.price, P.image, P.createdAt, P.isSelled, U.id AS userSellerId, U.username, U.avatar,
            (SELECT COUNT(p.userId) FROM reviews r, bookings b, products p WHERE p.userId = U.id AND p.id = b.productId AND b.id = r.bookingId) AS totalReviews,
            (SELECT AVG(r.starsRw) FROM reviews r, bookings b, products p WHERE p.userId = U.id AND p.id = b.productId AND b.id = r.bookingId) AS mediaStars
            FROM products P
            JOIN users U ON P.userId = U.id
            WHERE p.id = ?`,
            [id]
        );
        return products;
    } finally {
        if (connection) connection.release();
    }
};

export default getProductModel;
