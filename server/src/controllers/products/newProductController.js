// Importamos los modelos
import insertProductModel from '../../models/products/createProductModel.js';
// Importamos los esquemas de Joi
import newProductSchema from '../../schemas/products/newProductSchema.js';
// Importamos la función que valida esquemas y la función para guardar imagenes
import validateSchema from '../../utils/validateSchema.js';
import savePhoto from '../../utils/savePhoto.js';
import { generatePhotoName } from '../../helpers/encripters.js';

// Función para crear un nuevo artículo
const newProductController = async (req, res, next) => {
    try {
        const { productName, description, category, state, place, price } =
            req.body;
        // console.log(req.userId);
        // console.log(req.body);
        const userId = req.user;

        // Validar los datos que llegan por el body con el esquema Joi
        await validateSchema(newProductSchema, {
            ...req.body,
            ...req.files,
        });

        // Guardamos la imagen en una variable, si la hay
        let imageName;

        // Si hay una imagen, la guardamos y obtemos su nombre
        if (req.files?.image) {
            const namePhoto = generatePhotoName();
            imageName = await savePhoto(req.files.image, namePhoto, 'images');
        }

        // Creamos el producto en la BBDD
        const productId = await insertProductModel(
            productName,
            description,
            category,
            state,
            place,
            price,
            imageName,
            userId
        );

        res.send({
            status: 'ok',
            message: 'Producto creado con éxito',
            data: {
                product: {
                    id: productId,
                    userId: req.user.id,
                    description,
                    category,
                    state,
                    place,
                    price,
                    image: imageName || null,
                },
            },
        });
    } catch (err) {
        res.send(err);
    }
};

export default newProductController;
