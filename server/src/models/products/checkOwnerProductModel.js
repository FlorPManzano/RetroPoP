import getDb from '../../db/getDb.js';

const checkOwnerProductModel = async (productId, userId) => {
    let connection;

    try {
        connection = await getDb();

        // Localizamos al usuario con el email dado.
        const [products] = await connection.query(
            `SELECT * FROM products WHERE id = ? AND userId = ?`,
            [productId, userId]
        );
        return products;
    } finally {
        if (connection) connection.release();
    }
};

export default checkOwnerProductModel;
