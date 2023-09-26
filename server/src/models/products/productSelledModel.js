import getDb from '../../db/getDb.js';

const productSelledModel = async (resno) => {
    let connection;

    try {
        connection = await getDb();

        // Localizamos al usuario con el email dado.
        const products = await connection.query(
            `UPDATE products SET isSelled = 1 WHERE id = (SELECT productId FROM bookings WHERE resno = ?)`,
            [resno]
        );

        return products[0];
    } finally {
        if (connection) connection.release();
    }
};

export default productSelledModel;
