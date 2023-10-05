import getDb from '../../db/getDb.js';

const getListProductsFilterModel = async (params) => {
    const name = params.name === undefined ? '%' : `%${params.name}%`;
    const category =
        params.category === undefined ? '%' : `%${params.category}%`;
    const place =
        params.place === undefined || params.place === ''
            ? '%'
            : `%${params.place}%`;
    const minPrice = params.minPrice === undefined ? '0' : params.minPrice;
    const maxPrice =
        params.maxPrice === undefined ? '9999999999' : params.maxPrice;
    const state =
        params.state === undefined || params.state === '' ? '%' : params.state;

    console.log(name, category, place, minPrice, maxPrice, state);

    let connection;

    try {
        connection = await getDb();

        const products = await connection.query(
            `SELECT P.id, P.productName, P.description, P.category, P.state, P.place, P.price, P.image, P.createdAt, P.isSelled, U.id AS userId, U.username, U.avatar
            FROM products P
            JOIN users U ON P.userId = U.id
            WHERE P.productName LIKE ? AND P.category LIKE ? AND P.place LIKE ? AND P.price >= ? AND P.price <= ? AND P.state LIKE ?`,
            [name, category, place, minPrice, maxPrice, state]
        );

        console.log(products[0]);
        return products[0];
    } finally {
        if (connection) connection.release();
    }
};

export default getListProductsFilterModel;

// getListProductsFilterModel;
//
