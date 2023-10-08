// Importamos la conexión a la BBDD
import getDb from '../../db/getDb.js';

const newBookingModel = async (idBuyer, idProduct, resno) => {
    let connection;
    try {
        connection = await getDb();

        const booking = await connection.query(
            `INSERT INTO bookings (userBuyerId, productId, resno) VALUES (?, ?, ?)`,
            [idBuyer, idProduct, resno]
        );
        // Devolvemos el producto
        return booking;
    } finally {
        if (connection) connection.release();
    }
};

export default newBookingModel;
