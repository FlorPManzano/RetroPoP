// Importamos la conexión a la BBDD
import getDb from '../../db/getDb.js';

const getReviewsModel = async (id) => {
    let connection;
    try {
        connection = await getDb();

        const [reviews] = await connection.query(
            // `SELECT id FROM reviews WHERE bookingId = (SELECT id FROM bookings WHERE resno = ?)`,
            // [id]
            `SELECT P.id AS productId, P.image, P.productName, P.price, P.description, U.username AS userBuyer, U.id AS idBuyer, X.id AS userSeller,  X.id AS idSeller, B.id AS bookingId, B.resno, B.deliveryTime, R.titleRw FROM bookings B
            JOIN products P ON P.id = B.productId
            JOIN users X ON X.id = P.userId
            JOIN users U ON U.id = B.userBuyerId
            LEFT JOIN reviews R ON B.id = R.bookingId
            WHERE U.id = ? AND B.deliveryTime IS NOT NULL
            `,
            [id]
        );

        return reviews;
    } finally {
        if (connection) connection.release();
    }
};

export default getReviewsModel;
