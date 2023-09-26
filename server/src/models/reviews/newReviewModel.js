// Importamos la conexión a la BBDD
import getDb from '../../db/getDb.js';

const newReviewModel = async (bodyData, resno, user) => {
    const { titleRw, textRw, starsRw } = bodyData;
    let connection;
    try {
        connection = await getDb();

        const [booking] = await connection.query(
            `INSERT INTO reviews (titleRw, textRw, starsRw, bookingId, userSellerId, userBuyerId)
VALUES (?, ?, ?, (SELECT id FROM bookings WHERE resno = ?), (SELECT userId FROM products WHERE id = (SELECT productId FROM bookings WHERE resno = ?)), ?);`,
            [titleRw, textRw, starsRw, resno, resno, user]
        );

        // Devolvemos el producto
        return booking;
    } finally {
        if (connection) connection.release();
    }
};

export default newReviewModel;
