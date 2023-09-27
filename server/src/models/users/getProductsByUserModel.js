import getDb from '../../db/getDb.js';

async function getProductsByUserModel(id) {
    let connection;

    try {
        connection = await getDb();

        const [products] = await connection.query(
            `SELECT U.id, P.productName, P.description, P.category, P.state, P.place, P.price, P.image, p.createdAt, P.userId FROM users U
            JOIN products P
            ON U.id = P.userId
            WHERE U.id = ? AND P.isSelled = 0
            ORDER BY P.createdAt DESC`,
            [id]
        );

        return products;
    } catch (error) {
        console.log(error);
        return error;
    } finally {
        if (connection) connection.release();
    }
}

export default getProductsByUserModel;
