import confirmBookingModel from '../../models/bookings/confirmBookingModel.js';
import cancelBookingModel from '../../models/bookings/cancelBookingModel.js';
import getDataBookingModel from '../../models/bookings/getDataBookingModel.js';
import sendConfirmBookingMail from '../../services/sendConfirmBookingMail.js';
import sendCancelBookingMail from '../../services/sendCancelBookingMail.js';
import validateSchema from '../../utils/validateSchema.js';
import newBookingSchema from '../../schemas/bookings/newBookingSchema.js';
import productSelledModel from '../../models/products/productSelledModel.js';
import getBookingByResModel from '../../models/bookings/getBookingByResModel.js';
import deleteBookingsModel from '../../models/bookings/deleteBookingsModel.js';

const confirmBookingController = async (req, res, next) => {
    try {
        // Variable que almacenará el resno de la reserva
        const resno = req.params.uuid;

        // Variable que almacenará los datos de la reserva
        const { confirm, deliveryTime, deliveryPlace } = req.body;

        // Variable que almacenará los datos de la reserva
        const dataBooking = await getDataBookingModel(resno);

        console.log('DATAAAAAAAAAAAAA', dataBooking);

        // Si el usuario confirma la reserva, actualizamos el campo de deliveryTime y deliveryPlace en la tabla bookings

        if (confirm === true) {
            await validateSchema(newBookingSchema, req.body);
            const booking = await confirmBookingModel(
                resno,
                deliveryTime,
                deliveryPlace
            );
            // Una vez confirmada la reserva, actualizamos el campo isSelled a 1 en el producto
            productSelledModel(resno);

            const deleteBookings = await deleteBookingsModel(
                dataBooking[0].productId
            );

            console.log('deleteBookings', deleteBookings);

            // Enviamos un email al comprador
            sendConfirmBookingMail(dataBooking);
            res.send({
                status: 'ok',
                message: `Reserva confirmada correctamente en ${deliveryPlace} en ${deliveryTime}`,
                data: booking,
            });
        } else {
            // Si el usuario rechaza la reserva, enviaremos un email al comprador
            const booking = await cancelBookingModel(resno);
            sendCancelBookingMail(dataBooking);
            res.send({
                status: 'ok',
                message: 'Reserva rechazada correctamente',
                data: booking,
            });
        }
        // const booking = await confirmBookingModel(req.body.idBooking);
    } catch (err) {
        next(err);
    }
};

export default confirmBookingController;
