import Mailjet from 'node-mailjet';
import { MJ_APIKEY_PRIVATE, MJ_APIKEY_PUBLIC } from '../../config.js';

export default function sendMail(username, email, registrationCode) {
    const mailjet = new Mailjet({
        apiKey: MJ_APIKEY_PUBLIC,
        apiSecret: MJ_APIKEY_PRIVATE,
    });
    const request = mailjet.post('send', { version: 'v3.1' }).request({
        Messages: [
            {
                From: {
                    Email: 'atencion.retropop@gmail.com',
                    Name: 'RetroPoP	',
                },
                To: [
                    {
                        Email: email,
                        Name: `${username}`,
                    },
                ],
                Subject: 'Bienvenido a RetroPoP!',
                TextPart:
                    'Dear passenger 1, welcome to Mailjet! May the delivery force be with you!',
                HTMLPart: `<h3>Bienvenido a <a href="https://www.retropop.com/">RetroPop</a>!</h3><br />Hola ${username}, Activa tu cuenta a través del siguiente enlace http://localhost:3000/users/validate/${registrationCode}`,
            },
        ],
    });
    request
        .then((result) => {
            console.log(result.body);
        })
        .catch((err) => {
            console.log(err.statusCode);
        });
}