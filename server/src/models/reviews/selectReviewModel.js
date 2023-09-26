// Importamos la conexión a la BBDD
import getDb from '../../db/getDb.js';

const selectReviewModel = async (resno) => {
    let connection;
    try {
        connection = await getDb();

        const [result] = await connection.query(
            `SELECT id FROM reviews WHERE bookingId = (SELECT id FROM bookings WHERE resno = ?)`,
            [resno]
        );

        return result;
    } finally {
        if (connection) connection.release();
    }
};

export default selectReviewModel;
