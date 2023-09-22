import getDb from '../../db/getDb.js';

const getListProductsModel = async () => {
    let connection;

    try {
        connection = await getDb();

        // Localizamos al usuario con el email dado.
        const products = await connection.query(
            `SELECT * FROM products P JOIN users U ON P.userId = U.Id`
        );

        // Como solo puede haber un usuario con ese email
        //devolvemos el primer elemento del array que nos devuelve la consulta.
        return products[0];
    } finally {
        if (connection) connection.release();
    }
};

export default getListProductsModel;
