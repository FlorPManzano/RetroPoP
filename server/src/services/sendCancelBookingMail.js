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
                Subject: 'El vendedor ha rechazado tu reserva :(',
                TextPart:
                    'Dear passenger 1, welcome to Mailjet! May the delivery force be with you!',
                HTMLPart: `<h3>La reserva ha sido rechazada 💔</a>!</h3><br />Hola ${dataBooking[0].buyerName}, lamentamos comunicarte que el usuario ${dataBooking[0].sellerName} ha rechazado tu reserva del producto ${dataBooking[0].productName} por un importe de ${dataBooking[0].price}€.

                Desde RetroPop te recomendamos que sigas buscando, seguro que encuentras algo que te guste!`,
            },
        ],
    });
    request
        .then((result) => {
            console.log(result.body);
        })
        .catch((err) => {
            throw err.statusCode;
            console.log(err.statusCode);
        });
}
