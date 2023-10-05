import dotenv from 'dotenv';
dotenv.config();
import getDb from './getDb.js';
import {
    FgLightGreen,
    FgLightMagenta,
    FgLightRed,
} from '../helpers/colorsNode.js';

import { hashPassword } from '../helpers/encripters.js';

const backupDb = async () => {
    let connection;

    try {
        let connection = await getDb();

        console.log(
            FgLightMagenta,
            '---Añadiendo registros a la tabla users---'
        );
        const users = [
            {
                email: 'usuario1@example.com',
                username: 'Usuario 1',
                password: await hashPassword('Usuario1.'),
                avatar: 'Usuario1.png',
                bio: 'Amante de los tesoros olvidados.',
                registrationCode: null,
                isActive: 1,
            },
            {
                email: 'usuario2@example.com',
                username: 'Usuario 2',
                password: await hashPassword('Usuario2.'),
                avatar: 'Usuario2.png',
                bio: 'Buscadora de reliquias digitales. Explorando el mundo de la tecnología retro.',
                registrationCode: null,
                isActive: 1,
            },
            {
                email: 'usuario3@example.com',
                username: 'Usuario 3',
                password: await hashPassword('Usuario3.'),
                avatar: 'Usuario3.png',
                bio: 'Un nostálgico digital. Encuentra conmigo la magia de lo retro-tech.',
                registrationCode: null,
                isActive: 1,
            },
            {
                email: 'usuario4@example.com',
                username: 'Usuario 4',
                password: await hashPassword('Usuario4.'),
                avatar: 'Usuario4.png',
                bio: 'En busca de la tecnología perdida. Una fanática de lo retro-tech explorando esta plataforma.',
                registrationCode: null,
                isActive: 1,
            },
            {
                email: 'usuario5@example.com',
                username: 'Usuario 5',
                password: await hashPassword('Usuario5.'),
                avatar: 'Usuario5.png',
                bio: 'Una entusiasta de lo vintage digital. Encuentra joyas tecnológicas del pasado en mi perfil.',
                registrationCode: null,
                isActive: 1,
            },
            {
                email: 'usuario6@example.com',
                username: 'Usuario 6',
                password: await hashPassword('Usuario6.'),
                avatar: 'Usuario6.png',
                bio: 'Apasionada por lo clásico digital. Encuentra lo mejor del pasado en mi perfil.',
                registrationCode: null,
                isActive: 1,
            },
            {
                email: 'usuario7@example.com',
                username: 'Usuario 7',
                password: await hashPassword('Usuario7.'),
                avatar: 'Usuario7.png',
                bio: 'Entusiasta de lo vintage geek. Comparto mi pasión por lo retro en RetroPoP.',
                registrationCode: null,
                isActive: 1,
            },
            {
                email: 'usuario8@example.com',
                username: 'Usuario 8',
                password: await hashPassword('Usuario8.'),
                avatar: null,
                bio: null,
                registrationCode: '03c76d2a-e38a-464d-8f42-fb1730537f57',
                isActive: 0,
            },
            {
                email: 'usuario9@example.com',
                username: 'Usuario 9',
                password: await hashPassword('Usuario9.'),
                avatar: null,
                bio: null,
                registrationCode: '0873b0a0-d710-4e3f-a3d1-31f1e4281d53',
                isActive: 0,
            },
            {
                email: 'usuario10@example.com',
                username: 'Usuario 10',
                password: await hashPassword('Usuario10.'),
                avatar: null,
                bio: null,
                registrationCode: '6baa4df6-f7cc-49c2-9c31-0097b38d19dc',
                isActive: 0,
            },
        ];

        const usersQueryList = [];
        for (const {
            email,
            username,
            password,
            avatar,
            bio,
            registrationCode,
            isActive,
        } of users) {
            // Para gestionar los nulos
            const avatarValue = avatar ? `'${avatar}'` : null;
            const bioValue = bio ? `'${bio}'` : null;
            const registrationCodeValue = registrationCode
                ? `'${registrationCode}'`
                : null;

            usersQueryList.push(
                `('${email}', '${username}', '${password}', ${avatarValue}, ${bioValue}, ${registrationCodeValue}, ${isActive})`
            );
        }

        await connection.query(`
        INSERT INTO users(email, username, password, avatar, bio, registrationCode, isActive)
          VALUES${usersQueryList.join(',')};
        `);
        //     await connection.query(`
        //   INSERT INTO users (id, email, username, password, avatar, bio, createdAt, modifiedAt, registrationCode, isActive)
        //   VALUES
        //   (1, 'usuario1@example.com', 'Usuario 1', '$2y$10$kE2aaTF8BFS7i2wWpR6YTOtMlgXTfTiERLhAoGN9m/8V115sitYyC', 'Usuario1.png', 'Amante de los tesoros olvidados.', NOW(), NULL, NULL, 1),
        //   (2, 'usuario2@example.com', 'Usuario 2', '$2y$10$/8bOopCxettRBMrz/bDIMuZleq9vJKmZDx7UPrbt7Dl2bmoPQjZS6', 'Usuario2.png', 'Buscadora de reliquias digitales. Explorando el mundo de la tecnología retro.', NOW(), NULL, NULL, 1),
        //   (3, 'usuario3@example.com', 'Usuario 3', '$2y$10$fG2u2mAoG0DAVIi5b//WjOfJnZ.GjO0v0erKog/S282mAyIi020pq', 'Usuario3.png', 'Un nostálgico digital. Encuentra conmigo la magia de lo retro-tech.', NOW(), NULL, NULL, 1),
        //   (4, 'usuario4@example.com', 'Usuario 4', '$2y$10$/o0/Lg1MbhiszJ85tXY1Q.358Veew4UOSjZgOdVjZzv/nQgyLhcG.', 'Usuario4.png', 'En busca de la tecnología perdida. Una fanática de lo retro-tech explorando esta plataforma.', NOW(), NULL, NULL, 1),
        //   (5, 'usuario5@example.com', 'Usuario 5', '$2y$10$AbPfGdCkITyxjLrEMtL43.NO7KlQABj83.eAv9XW2qzbTZ1nGwbay', 'Usuario5.png', 'Una entusiasta de lo vintage digital. Encuentra joyas tecnológicas del pasado en mi perfil.', NOW(), NULL, NULL, 1),
        //   (6, 'usuario6@example.com', 'Usuario 6', '$2y$10$bsNliBaftKxPOgEEiRQBju72n.M2FhhsOskL7U4f6yvgyA9BqgaSq', 'Usuario6.png', 'Apasionada por lo clásico digital. Encuentra lo mejor del pasado en mi perfil.', NOW(), NULL, NULL, 1),
        //   (7, 'usuario7@example.com', 'Usuario 7', '$2y$10$PY218sVlw8TCRc4zp.u1POwGFGwaNtvf4ci7wVB2jxt6hAFYNebvS', 'Usuario7.png', 'Entusiasta de lo vintage geek. Comparto mi pasión por lo retro en RetroPoP.', NOW(), NULL, NULL, 1),
        //   (8, 'usuario8@example.com', 'Usuario 8', '$2y$10$bZVPpnoMk.rQdydweFaMUeZc7j.aiO4zZJg/0XAr.aBH1IumsdBA2', NULL, NULL, NOW(), NULL, '03c76d2a-e38a-464d-8f42-fb1730537f57', 0),
        //   (9, 'usuario9@example.com', 'Usuario 9', '$2y$10$tOYpNu67WdzLVq1Hn5xwIOLFwkeVpoj2T3P22h6EVXw0ZVc.LEjcS', NULL, NULL, NOW(), NULL, '0873b0a0-d710-4e3f-a3d1-31f1e4281d53', 0),
        //   (10, 'usuario10@example.com', 'Usuario 10', '$2y$10$wU3eqhGf2CxVn2l5KhCPmOK32Zs.XSKCXVPanh6co6pzU52hZGO16', NULL, NULL, NOW(), NULL, '6baa4df6-f7cc-49c2-9c31-0097b38d19dc', 0);
        // `);

        console.log(
            FgLightMagenta,
            '---Añadiendo registros a la tabla products---'
        );
        await connection.query(`
      INSERT INTO products (id, productName, description, category, state, place, price, image, createdAt, modifiedAt, isSelled, userId)
      VALUES
      (1, 'Walkman-Marca SONY', 'Walkman Sony clásico de 1985 en excelente estado. Totalmente funcional, con un diseño retro auténtico. Perfecto para revivir la experiencia de escuchar música en cassettes de la década de los 80.', 'Audio', 'Como nuevo', 'Madrid', 29.50, 'audio1.jpg', NOW(), NULL, 0, 1),
      (2, 'Tocadiscos en perfectas condiciones', 'Tocadiscos Lenco modelo L-3808 estilo vintage en perfecto estado. Modelo clásico de los años 70. Funcionamiento impecable.', 'Audio', 'Como nuevo', 'Madrid', 60, 'audio2.jpg', NOW(), NULL, 1, 1),
      (3, 'Gramófono años 1920s', 'Gramófono marca Gramophony de la década de 1920, envejecido y no funcional. Muestra signos evidentes de desgaste debido al tiempo. Ideal para proyectos de restauración o como pieza decorativa vintage', 'Audio', 'En condiciones aceptables', 'Valencia', 25, 'audio3.jpg', NOW(), NULL, 1, 5),
      (4, 'Cámara Yashica', 'Cámara de fotos Yashica analógica de los años 80. Presenta signos de uso pero sigue siendo completamente funcional. Perfecta para coleccionistas y amantes de la fotografía vintage.', 'Cámaras de fotos', 'En buen estado', 'A Coruña', 35, 'camaradefotos1.jpg', NOW(), NULL, 0, 3),
      (5, 'Nintendo NES', 'Aunque no está operativa, su apariencia exterior es impecable y puede servir como un objeto decorativo.', 'Consolas', 'No funciona', 'Santa Cruz de Tenerife', 15, 'consola1.jpg', NOW(), NULL, 0, 7),
      (6, 'GameBoy 90s', 'Ideal para los amantes de los juegos retro. Muestra signos de uso pero funciona correctamente. Vienen incluidos varios juegos.', 'Consolas', 'En buen estado', 'Madrid', 30, 'consola2.jpg', NOW(), NULL, 0, 1),
      (7, 'Apple lisa 2', 'Apple Lisa 2 no funcional pero bien conservado. Comprada en 1985. Ideal para coleccionistas de tecnología retro.', 'Ordenadores', 'En buen estado', 'Málaga', 150, 'ordenador1.jpg', NOW(), NULL, 0, 2),
      (8, 'Western Electric', 'Teléfono antiguo Western Electric de la década de 1950 en estado original. Perfecto para coleccionistas.', 'Teléfonos', 'En buen estado', 'Bilbao', 22, 'telefono1.jpg', NOW(), NULL, 1, 6),
      (9, 'Televisor retro decorativo', 'Televisor antiguo Zenith de la década de 1960 en buen estado visual, pero no funcional. Ideal para decoración', 'Televisores', 'No funciona', 'Bilbao', 36, 'televisor1.jpg', NOW(), NULL, 0, 6),
      (10, 'Sankyo VM-4200', 'Cámara de video Sankyo VM-4200 de los años 80 en buen estado de conservación y funcional.', 'Video', 'Como nuevo', 'Madrid', 80, 'video1.jpg', NOW(), NULL, 1, 1),
      (11, 'Radio Murphy modelo MR-1950', 'De la década de 1950 en buen estado de conservación. Una pieza de radio vintage para aficionados a la tecnología retro.', 'Audio', 'En condiciones aceptables', 'Santa Cruz de Tenerife', 48, 'audio4.jpg', NOW(), NULL, 0, 7),
      (12, 'Cámara de fotos Polaroid', 'Modelo SX-70 en excelente estado y funcional.', 'Cámaras de fotos', 'Como nuevo', 'Barcelona', 59, 'camaradefotos2.jpg', NOW(), NULL, 0, 4),
      (13, 'Reloj de bolsillo', 'Reloj de bolsillo antiguo, modelo desconocido, de principios del siglo XX en buen estado de conservación.', 'Relojes', 'Como nuevo', 'Barcelona', 76, 'reloj1.jpg', NOW(), NULL, 0, 4),
      (14, 'Teléfono de baquelita antiguo', 'modelo Ericsson DBH 1001, de principios del siglo XX en estado de conservación aceptable aunque no funciona.', 'Teléfonos', 'No funciona', 'Valencia', 28, 'telefono2.jpg', NOW(), NULL, 0, 5),
      (15, 'Reproductor VHS', 'marca Index, modelo Panasonic NV-HS1000 de los años 90. No funcional y con claros signos de desgaste.', 'Video', 'No funciona', 'A Coruña', 20, 'video2.jpg', NOW(), NULL, 0, 3);
    `);

        console.log(
            FgLightMagenta,
            '---Añadiendo registros a la tabla bookings---'
        );
        await connection.query(`
      INSERT INTO bookings (id, resno, deliveryPlace, deliveryTime, createdAt, userBuyerId, productId)
      VALUES
      (1, '333cbf89-ddc3-4f2b-8b92-9d1a5424e6f2', NULL, NULL, NOW(), 1, 15),
      (2, 'f8f196c3-c850-4703-82ba-f3162ea0bfb3', 'Barcelona', '2023-10-01 16:00:00', NOW(), 6, 12),
      (3, '6a85c270-e112-48eb-9937-d6f6c363035a', NULL, NULL, NOW(), 7, 10),
      (4, '89c75662-a633-4b42-b59c-4474745614f4', 'Madrid', '2023-09-25 16:00:00', NOW(), 4, 2),
      (5, '9bc4f77e-9d95-440a-915b-f4315bd33410', NULL, NULL, NOW(), 2, 15),
      (6, 'd4112f69-81b1-4a03-80ea-b6413ed96562', 'A Coruña', '2023-10-05 10:00:00', NOW(), 5, 4),
      (7, '5faedf45-3c0c-44bf-b8f8-50bd27588965', 'Valencia', '2023-09-22 13:30:00', NOW(), 6, 3),
      (8, '7f3e37ff-4d28-4053-ba3a-ea48006f4d7f', 'Madrid', '2023-09-24 16:00:00', NOW(), 3, 10);
    `);
        console.log(
            FgLightMagenta,
            '---Añadiendo registros a la tabla reviews---'
        );
        await connection.query(`
      INSERT INTO reviews (id, titleRw, textRw, starsRw, createdAt, modifiedAt, bookingId)
      VALUES
      (1, 'Vendedor excelente', 'Muy puntual y el producto tal y como se describe.', '5', NOW(), NULL, 4),
      (2, 'Ha llegado tarde a la entrega', 'Ha llegado media hora tarde a la entrega y no ha sido nada agradable', '2', NOW(), NULL, 7);
    `);

        console.log(FgLightGreen, '¡Registros añadidos con éxito!');
    } catch (err) {
        console.error(FgLightRed, 'Error al añadir los registros:', err);
    } finally {
        if (connection) connection.release();
        process.exit();
    }
};

backupDb();
