// Importamos la conexión a la BBDD
import getDb from '../../db/getDb.js';

const createProductModel = async (
    productName,
    description,
    category,
    state,
    place,
    price,
    image,
    userId
) => {
    console.log('o aquí');
    let connection;
    try {
        connection = await getDb();
        console.log(
            productName,
            description,
            category,
            state,
            place,
            price,
            image,
            userId
        );
        const [product] = await connection.query(
            `INSERT INTO products (productName, description, category, state, place, price, image, userId) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                productName,
                description,
                category,
                state,
                place,
                price,
                image,
                userId,
            ]
        );

        // Devolvemos el producto insertado, el id
        return product;
    } finally {
        if (connection) connection.release();
    }
};

export default createProductModel;
