// Importamos la conexión a la BBDD
import getDb from '../../db/getDb.js';

const getCheckRepeatBooking = async (idBuyer, idProduct, idSeller) => {
    let connection;
    try {
        connection = await getDb();

        const [booking] = await connection.query(
            `SELECT * FROM bookings WHERE userBuyerId = ? AND productId = ? AND userSellerId = ?`,
            [idBuyer, idProduct, idSeller]
        );

        // Devolvemos el producto
        return booking;
    } finally {
        if (connection) connection.release();
    }
};

export default getCheckRepeatBooking;
