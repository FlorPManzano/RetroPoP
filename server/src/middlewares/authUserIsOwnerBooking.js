import { bookingAuthOwnerError } from '../errors/errorService.js';
import getBookingByResModel from '../models/bookings/getBookingByResModel.js';

const authUserIsOwnerBooking = async (req, res, next) => {
    try {
        const { resno } = req.params;
        const id = req.user;
        const [result] = await getBookingByResModel(resno);

        if (result[0].userBuyerId !== id) bookingAuthOwnerError();
        next();
    } catch (err) {
        next(err);
    }
};

export default authUserIsOwnerBooking;
