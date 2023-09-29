// Importamos la conexión a la BBDD
import getDb from '../../db/getDb.js';

const getBookingByResModel = async (res) => {
    let connection;
    try {
        connection = await getDb();

        const [booking] = await connection.query(
            `SELECT * FROM bookings WHERE resno = ?`,
            [res]
        );
        console.log('ey booking', booking);
        // Devolvemos el producto
        return booking;
    } finally {
        if (connection) connection.release();
    }
};

export default getBookingByResModel;
