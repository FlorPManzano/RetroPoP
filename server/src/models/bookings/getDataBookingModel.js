// Importamos la conexión a la BBDD
import getDb from '../../db/getDb.js';

const getDataBookingModel = async (resno) => {
    let connection;
    try {
        connection = await getDb();

        const [booking] = await connection.query(
            `SELECT B.deliveryPlace, B.deliveryTime, B.resno, P.productName, P.price, U.email AS buyerEmail, U.username AS buyerName, X.username AS sellerName
            FROM bookings B
            JOIN products P ON B.productId = P.id
            JOIN users U  ON B.userBuyerId = U.id
            JOIN users X ON P.userId = X.id
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
