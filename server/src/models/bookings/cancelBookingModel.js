// Importamos la conexión a la BBDD
import getDb from '../../db/getDb.js';

const cancelBookingModel = async (resno) => {
    let connection;
    try {
        connection = await getDb();

        const [bookingDeleted] = await connection.query(
            `DELETE FROM bookings WHERE resno = ?`,
            [resno]
        );

        // Devolvemos el producto
        return bookingDeleted;
    } finally {
        if (connection) connection.release();
    }
};

export default cancelBookingModel;
