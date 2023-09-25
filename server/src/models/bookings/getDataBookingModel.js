// Importamos la conexión a la BBDD
import getDb from '../../db/getDb.js';

const getDataBookingModel = async (resno) => {
    let connection;
    try {
        connection = await getDb();

        const [booking] = await connection.query(
            `SELECT B.deliveryPlace, B.deliveryTime, B.resno, P.productName, P.price,
            (SELECT email FROM users WHERE id = B.userBuyerId) AS buyerEmail,
            (SELECT username FROM users WHERE id = B.userBuyerId) AS buyerName,
            (SELECT username FROM users WHERE id = B.userSellerId) AS sellerName
            FROM bookings B
            JOIN users U ON B.userSellerId = U.id
            JOIN products P ON B.productId = P.id
            WHERE B.resno = ?`,
            [resno]
        );

        // Devolvemos el producto
        return booking;
    } finally {
        if (connection) connection.release();
    }
};

export default getDataBookingModel;
