import getBookingByResModel from '../models/bookings/getBookingByResModel.js';
import { bookingNotFoundError } from '../errors/errorService.js';

const checkBookingExist = async (req, res, next) => {
    try {
        // Variable que almacenará el resultado de la consulta a la base de datos
        const booking = await getBookingByResModel(req.params.uuid);

        // Si no existe la reserva lanzamos un error
        if (booking.length === 0) bookingNotFoundError();
        next();
    } catch (error) {
        next(error);
    }
};

export default checkBookingExist;
