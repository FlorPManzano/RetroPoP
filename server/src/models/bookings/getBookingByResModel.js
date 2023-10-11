// Importamos la conexión a la BBDD
import getDb from '../../db/getDb.js';

const getBookingByResModel = async (resno) => {
    let connection;
    try {
        connection = await getDb();
        const booking = await connection.query(
            `SELECT * FROM bookings WHERE resno = ?`,
            [resno]
        );
        // Devolvemos el producto

        return booking;
    } finally {
        if (connection) connection.release();
    }
};

export default getBookingByResModel;
