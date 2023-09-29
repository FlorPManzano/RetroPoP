import Mailjet from 'node-mailjet';
import { MJ_USER, MJ_APIKEY_PRIVATE, MJ_APIKEY_PUBLIC } from '../../config.js';

export default function sendConfirmBookingMail(dataBooking) {
    const mailjet = new Mailjet({
        apiKey: MJ_APIKEY_PUBLIC,
        apiSecret: MJ_APIKEY_PRIVATE,
    });
    const request = mailjet.post('send', { version: 'v3.1' }).request({
        Messages: [
            {
                From: {
                    Email: MJ_USER,
                    Name: 'RetroPoP	',
                },
                To: [
                    {
                        Email: dataBooking[0].buyerEmail,
                        Name: dataBooking[0].buyerName,
                    },
                ],
                Subject: 'El vendedor ha aceptado tu reserva!!!',
                TextPart:
                    'Dear passenger 1, welcome to Mailjet! May the delivery force be with you!',
                HTMLPart: `<h3>Tienes una RetroReserva!!!🎉</a>!</h3><br />Hola ${dataBooking[0].buyerName}, el usuario ${dataBooking[0].sellerName} ha aceptado la  reserva del producto ${dataBooking[0].productName} por un importe de ${dataBooking[0].price}€.

                El lugar de entrega confirmado es ${dataBooking[0].deliveryPlace} y la hora de entrega es ${dataBooking[0].deliveryTime}. No llegues tarde!`,
            },
        ],
    });
    request
        .then((result) => {
            console.log(result.body);
        })
        .catch((err) => {
            throw err.statusCode;
        });
}
