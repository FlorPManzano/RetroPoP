import jwt from 'jsonwebtoken';
import { SECRET } from '../../config.js';
import { userIsASameBuyerError } from '../errors/errorService.js';
import getSellerModel from '../models/products/getSellerModel.js';

const checkSameUser = async (req, res, next) => {
    try {
        // Variable que almacenará el resultado con los datos del vendedor haciendo una consolta la db con el id del producto
        console.log('req.body.idProduct', req.body.idProduct);
        const dataSeller = await getSellerModel(req.body.idProduct);
        // Variable que almacenará el id del vendedor
        console.log('dataseller', dataSeller);
        const seller = dataSeller[0].userSellerId;
        console.log('seller', seller);

        // Variable que almacenará el id del comprador
        const buyer = jwt.verify(req.headers.authorization, SECRET).id;
        console.log('buyer', buyer);

        // Si el id del vendedor es igual al id del comprador lanzamos un error
        if (seller === buyer) userIsASameBuyerError();
        next();
    } catch (error) {
        next(error);
    }
};

export default checkSameUser;
