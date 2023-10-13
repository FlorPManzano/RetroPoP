// Importamos la conexión a la BBDD
import getDb from '../../db/getDb.js';

const getCheckRepeatBooking = async (idBuyer, idProduct) => {
    let connection;
    try {
        connection = await getDb();

        const [booking] = await connection.query(
            // `SELECT * FROM bookings B JOIN products P ON B.productId = (SELECT userId FROM products WHERE P.id = B.productId) as userSellerId WHERE userBuyerId = ? AND productId = ?`,
            // [idBuyer, idProduct]
            `SELECT * FROM bookings WHERE userBuyerId = ? AND productId = ?`,
            [idBuyer, idProduct]
        );

        // Devolvemos el producto
        return booking;
    } finally {
        if (connection) connection.release();
    }
};

export default getCheckRepeatBooking;
