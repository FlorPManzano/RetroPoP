import jwt from 'jsonwebtoken';
import { SECRET } from '../../config.js';
import getCheckRepeatBooking from '../models/bookings/getCheckRepeatBooking.js';
import { bookingDuplicatedError } from '../errors/errorService.js';

const checkRepeatBooking = async (req, res, next) => {
    try {
        const buyer = jwt.verify(req.headers.authorization, SECRET).id;
        const product = req.body.idProduct;
        const seller = req.body.idSeller;
        const booking = await getCheckRepeatBooking(buyer, product, seller);
        if (booking.length > 0) bookingDuplicatedError();

        next();
    } catch (error) {
        next(error);
    }
};

export default checkRepeatBooking;
