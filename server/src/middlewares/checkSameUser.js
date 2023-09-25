import jwt from 'jsonwebtoken';
import { SECRET } from '../../config.js';
import { userIsASameBuyerError } from '../errors/errorService.js';
import getProductModel from '../models/products/getProductModel.js';

const checkSameUser = async (req, res, next) => {
    try {
        const dataSeller = await getProductModel(req.body.idProduct);
        const seller = dataSeller[0].userId;
        const buyer = jwt.verify(req.headers.authorization, SECRET).id;
        if (seller === buyer) userIsASameBuyerError();
        next();
    } catch (error) {
        next(error);
    }
};

export default checkSameUser;
