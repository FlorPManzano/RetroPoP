import getDb from '../../db/getDb.js';

const deleteBookingsModel = async (id) => {
    let connection;

    try {
        connection = await getDb();

        // Localizamos al usuario con el email dado.
        const result = await connection.query(
            `DELETE FROM bookings WHERE productId = ? AND deliveryPlace IS NULL`,
            [id]
        );

        return result[0];
    } finally {
        if (connection) connection.release();
    }
};

export default deleteBookingsModel;
