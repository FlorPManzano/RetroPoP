import editProductModel from '../../models/products/editProductModel.js';
import savePhoto from '../../utils/savePhoto.js';
import { generatePhotoName } from '../../helpers/encripters.js';

const editProductController = async (req, res, next) => {
    try {
        const {
            productName,
            description,
            category,
            state,
            place,
            price,
            productId,
        } = req.body;

        let imageName = req.body.originalImg;

        // Si hay una imagen, la guardamos y obtemos su nombre
        if (req.files?.image) {
            const namePhoto = generatePhotoName();
            imageName = await savePhoto(req.files.image, namePhoto, 'images');
        }

        const productEdit = await editProductModel(
            productName,
            description,
            category,
            state,
            place,
            price,
            imageName,
            productId
        );

        res.send({
            status: 'ok',
            message: 'Producto editado correctamente',
            productEdit,
        });
    } catch (err) {
        next(err);
    }
};

export default editProductController;

// try {
//     const { productName, description, category, state, place, price } =
//         req.body;
//     const userId = req.user;

//     // Validar los datos que llegan por el body con el esquema Joi
//     await validateSchema(newProductSchema, {
//         ...req.body,
//         ...req.files,
//     });

//     // Guardamos la imagen en una variable, si la hay
//     let imageName;

//     // Si hay una imagen, la guardamos y obtemos su nombre
//     if (req.files?.image) {
//         const namePhoto = generatePhotoName();
//         imageName = await savePhoto(req.files.image, namePhoto, 'images');
//     }

//     // Creamos el producto en la BBDD
//     const productId = await insertProductModel(
//         productName,
//         description,
//         category,
//         state,
//         place,
//         price,
//         imageName,
//         userId
//     );

//     res.send({
//         status: 'ok',
//         message: 'Producto creado con éxito',
//         data: {
//             userId: req.user,
//             description,
//             category,
//             state,
//             place,
//             price,
//             image: imageName || null,
//         },
//     });
// } catch (err) {
//     next(err);
// }
