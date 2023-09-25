import confirmBookingModel from '../../models/bookings/confirmBookingModel.js';
import cancelBookingModel from '../../models/bookings/cancelBookingModel.js';
import getDataBookingModel from '../../models/bookings/getDataBookingModel.js';
import sendConfirmBookingMail from '../../services/sendConfirmBookingMail.js';
import sendCancelBookingMail from '../../services/sendCancelBookingMail.js';

const confirmBookingController = async (req, res, next) => {
    try {
        const resno = req.params.uuid;
        const { confirm, deliveryTime, deliveryPlace } = req.body;
        const dataBooking = await getDataBookingModel(resno);

        if (confirm === true) {
            const booking = await confirmBookingModel(
                resno,
                deliveryTime,
                deliveryPlace
            );
            sendConfirmBookingMail(dataBooking);
            res.send({
                status: 'ok',
                message: `Reserva confirmada correctamente en ${deliveryPlace} en ${deliveryTime}`,
                data: booking,
            });
        } else {
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
