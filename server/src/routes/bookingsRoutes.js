// -   POST `/bookings/:productId` - Permite crear una reserva solo si no eres el propietario de producto.
// -   GET `/bookings/:orderId` - Permite crear un producto.
// -   PUT `/bookings/confirm/:productId` - Confirmación de la reserva del comprador.
import express from 'express';

// Middlewares
import authUser from '../middlewares/authUser.js';
import checkSameUser from '../middlewares/checkSameUser.js';

// Controllers
import newBookingController from '../controllers/bookings/newBookingController.js';
import checkRepeatBooking from '../middlewares/checkRepeatBooking.js';

// Router
const router = express.Router();

router.post(
    '/:productId',
    authUser,
    checkSameUser,
    checkRepeatBooking,
    newBookingController
);

export default router;

// ;
