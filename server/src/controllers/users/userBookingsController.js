import selectBookingsByIdUserModel from '../../models/users/selectBookingsByIdUserModel.js';

const userBookingsController = async (req, res, next) => {
    try {
        const userBookings = await selectBookingsByIdUserModel(req.user);

        res.send({
            status: 'ok',
            userBookings:
                userBookings.length !== 0
                    ? userBookings
                    : 'El usuario no tiene ninguna reserva activa',
        });
    } catch (err) {
        // Aquí hemos sustituido next(err) por res.send(err) porque no tenemos un middleware de errores.
        next(err);
    }
};

export default userBookingsController;
