// Importamos la conexión a la BBDD
import getDb from '../../db/getDb.js';

const cancelBookingModel = async (resno) => {
    let connection;
    try {
        // Obtenemos la conexión a la base de datos.
        connection = await getDb();

        // Eliminamos la reserva de la db a través del número de reserva.
        const [bookingDeleted] = await connection.query(
            `DELETE FROM bookings WHERE resno = ?`,
            [resno]
        );

        // Devolvemos la información de la reserva eliminada.

        return bookingDeleted;
    } finally {
        if (connection) connection.release();
    }
};

export default cancelBookingModel;
