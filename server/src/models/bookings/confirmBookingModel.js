// Importamos la conexión a la BBDD
import getDb from '../../db/getDb.js';

const confirmBookingModel = async (resno, deliveryTime, deliveryPlace) => {
    let connection;
    try {
        connection = await getDb();

        const [booking] = await connection.query(
            `UPDATE bookings SET deliveryTime = ?, deliveryPlace = ? WHERE resno = ?`,
            [deliveryTime, deliveryPlace, resno]
        );

        // Devolvemos el producto
        return booking;
    } finally {
        if (connection) connection.release();
    }
};

export default confirmBookingModel;
