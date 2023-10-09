// Importamos la función que nos permite obtener una conexión a la base de datos.
import getDb from '../../db/getDb.js';

// Función que se conectará a la base de datos y devolverá los datos de un usuario.
const selectBookingsByIdUserModel = async (id) => {
    let connection;

    try {
        connection = await getDb();

        const [bookings] = await connection.query(
            `SELECT P.id AS productId, P.image, P.productName, P.price, P.description, U.username AS userBuyer, U.id AS userBuyerId, B.createdAt, B.resno, B.id FROM bookings B
            JOIN products P ON P.id = B.productId
            JOIN users X ON X.id = P.userId
            JOIN users U ON U.id = B.userBuyerId
            WHERE X.id=? AND B.deliveryPlace IS NULL`,
            [id]
        );

        console.log('desde el model', bookings);

        return bookings;
    } finally {
        if (connection) connection.release();
    }
};

export default selectBookingsByIdUserModel;
