import { generateCode } from '../../helpers/encripters.js';
import newBookingModel from '../../models/bookings/newBookingModel.js';
import getSellerModel from '../../models/products/getSellerModel.js';
import selectUserByIdModel from '../../models/users/selectUserByIdModel.js';
import sendBookingEmail from '../../services/sendBookingMail.js';

const newBookingController = async (req, res) => {
    try {
        const { idProduct } = req.body;
        const idBuyer = req.user;
        const dataProduct = await getSellerModel(idProduct);
        const dataSeller = {
            username: dataProduct[0].username,
            email: dataProduct[0].email,
            price: dataProduct[0].price,
            productName: dataProduct[0].productName,
        };
        const resno = generateCode();

        const dataBuyer = await selectUserByIdModel(idBuyer);

        const bookingModel = await newBookingModel(idBuyer, idProduct, resno);

        sendBookingEmail(dataSeller, await dataBuyer.username, resno);

        res.send({
            status: 'ok',
            message: `Reserva creada correctamente con el número de reserva ${resno}, le hemos mandado un email al vendedor para que confirme o rechace la venta.`,
        });
    } catch (err) {
        res.send(err);
    }
};

export default newBookingController;
