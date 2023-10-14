import getDb from '../../db/getDb.js';

const editProductModel = async (
    productName,
    description,
    category,
    state,
    place,
    price,
    imageName,
    productId
) => {
    let connection;

    try {
        connection = await getDb();

        const [editProduct] = await connection.query(
            `UPDATE products SET productName = ?, description = ?, category = ?, state = ?, place = ?, price = ?, image = ?  WHERE id = ?;`,
            [
                productName,
                description,
                category,
                state,
                place,
                price,
                imageName,
                productId,
            ]
        );
        return editProduct;
    } finally {
        if (connection) connection.release();
    }
};

export default editProductModel;
