// SELECT r.id, x.id AS userSeller,  u.id AS userBuyer
// FROM bookings b
// JOIN reviews r
// ON r.bookingId = b.id
// JOIN users u
// ON b.userBuyerId = u.id
// JOIN products p
// ON b.productId = p.id
// JOIN users x
// ON p.userId = x.id
//WHERE b.resno = '5faedf45-3c0c-44bf-b8f8-50bd27588965';

import { bookingAuthOwnerError } from '../errors/errorService.js';
import getBookingByResModel from '../models/bookings/getBookingByResModel.js';

const authUserIsOwnerBooking = async (req, res, next) => {
    try {
        const { resno } = req.params;
        const id = req.user;
        const result = await getBookingByResModel(resno);
        console.log('ey tu', result);
        if (result[0].userBuyerId !== id) bookingAuthOwnerError();
        next();
    } catch (err) {
        next(err);
    }
};

export default authUserIsOwnerBooking;
