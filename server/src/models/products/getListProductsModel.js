import getDb from '../../db/getDb.js';

const getListProductsModel = async () => {
    let connection;

    try {
        connection = await getDb();

        const products = await connection.query(
            `SELECT P.id, P.productName, P.price FROM products P`
        );

        return products[0];
    } finally {
        if (connection) connection.release();
    }
};

export default getListProductsModel;
