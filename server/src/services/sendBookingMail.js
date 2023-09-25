import Mailjet from 'node-mailjet';
import { MJ_USER, MJ_APIKEY_PRIVATE, MJ_APIKEY_PUBLIC } from '../../config.js';

export default function sendMail(dataSeller, dataBuyer, resno) {
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
                        Email: dataSeller.email,
                        Name: dataSeller.username,
                    },
                ],
                Subject: 'Tienes una nueva reserva en RetroPoP!!!',
                TextPart:
                    'Dear passenger 1, welcome to Mailjet! May the delivery force be with you!',
                HTMLPart: `<h3>Tienes una RetrOferta!!!</a>!</h3><br />Hola ${dataSeller.username}, el usuario ${dataBuyer} ha realizado una reserva de tu producto ${dataSeller.productName} por un importe de ${dataSeller.price}€.

                Para confirmar tu reserva entra en tu perfil y acepta o rechaza la reserva.

                También puedes acceder a la oferta a través del siguiente enlace http://localhost:3000/booking/${resno}`,
            },
        ],
    });
    request
        .then((result) => {
            console.log(result.body);
        })
        .catch((err) => {
            next(err);
            console.log(err.statusCode);
        });
}
