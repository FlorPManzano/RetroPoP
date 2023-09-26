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
    let connection;
    try {
        connection = await getDb();

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

        console.log(
            'QUE COJONES VIENE POR AQUI',
            productName,
            description,
            category,
            state,
            place,
            price,
            image,
            userId
        );

        // Devolvemos el producto insertado, el id
        return product;
    } finally {
        if (connection) connection.release();
    }
};

export default createProductModel;
