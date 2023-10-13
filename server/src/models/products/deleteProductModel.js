import getDb from '../../db/getDb.js';

const deleteProductModel = async (id) => {
    let connection;

    try {
        connection = await getDb();

        await connection.query(`DELETE FROM products WHERE id = ?;`, [id]);
    } finally {
        if (connection) connection.release();
    }
};

export default deleteProductModel;
