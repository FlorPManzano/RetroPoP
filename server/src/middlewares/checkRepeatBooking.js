import jwt from 'jsonwebtoken';
import { SECRET } from '../../config.js';
import getCheckRepeatBooking from '../models/bookings/getCheckRepeatBooking.js';
import { bookingDuplicatedError } from '../errors/errorService.js';
import getProductModel from '../models/products/getProductModel.js';

const checkRepeatBooking = async (req, res, next) => {
    try {
        // Variable que almacenará el resultado desencriptado del usuario que llega desde el token
        const buyer = jwt.verify(req.headers.authorization, SECRET).id;
        // Variables que almacenarán el resultado del producto que llega desde el body
        const product = req.body.idProduct;

        // Variable que almacenará el resultado de la consulta a la base de datos
        const booking = await getCheckRepeatBooking(buyer, product);
        // Si no existe la reserva lanzamos un error
        if (booking.length > 0) bookingDuplicatedError();

        next();
    } catch (error) {
        next(error);
    }
};

export default checkRepeatBooking;
