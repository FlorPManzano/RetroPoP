import getBookingByResModel from '../models/bookings/getBookingByResModel.js';
import { bookingNotFoundError } from '../errors/errorService.js';

const checkBookingExist = async (req, res, next) => {
    try {
        const booking = await getBookingByResModel(req.params.idBooking);
        if (booking.length === 0) bookingNotFoundError();
        next();
    } catch (error) {
        next(error);
    }
};

export default checkBookingExist;
