import formatDate from '../utils/formatDate.js';
import getBookingByResModel from '../models/bookings/getBookingByResModel.js';
import { dateBookingNotPassed } from '../errors/errorService.js';

const reviewOnTime = async (req, res, next) => {
    try {
        const booking = await getBookingByResModel(req.params.resno);
        console.log(booking);
        let { deliveryTime } = booking[0];
        deliveryTime = formatDate(deliveryTime);
        console.log(deliveryTime);
        const now = formatDate(new Date());
        console.log(now);
        if (deliveryTime > now) dateBookingNotPassed(deliveryTime);
        next();
    } catch (error) {
        next(error);
    }
};

export default reviewOnTime;
