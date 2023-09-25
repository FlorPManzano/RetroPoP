import jwt from 'jsonwebtoken';
import { SECRET } from '../../config.js';
import { userIsASameBuyerError } from '../errors/errorService.js';

const checkSameUser = async (req, res, next) => {
    try {
        const seller = req.body.idSeller;
        const buyer = jwt.verify(req.headers.authorization, SECRET).id;
        if (seller === buyer) userIsASameBuyerError();
        next();
    } catch (error) {
        next(error);
    }
};

export default checkSameUser;
