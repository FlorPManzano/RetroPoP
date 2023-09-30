import dotenv from 'dotenv';
dotenv.config();

// Importamos los colores para la consola
import {
    FgLightBlue,
    FgLightGreen,
    FgLightYellow,
    FgLightMagenta,
    FgLightRed,
} from '../helpers/colorsNode.js';

import { hashPassword } from '../helpers/encripters.js';

// Importamos la función que nos permite obtener una conexión libre con la base de datos.
import getDb from './getDb.js';

// Función que borrará las tablas de la base de datos (si existen) y las volverá a crear.
const main = async () => {
    // Variable que almacenará una conexión libre con la base de datos.
    // Se crea fuera de bloque try/catch para poder gestionar los errores.
    let connection;

    try {
        // Iniciamos la conexión con la BBDD
        let connection = await getDb();

        console.log(FgLightYellow, 'Borrando tablas si existen...');

        await connection.query(
            'DROP TABLE IF EXISTS bookings, reviews, products, users'
        );

        console.log(FgLightBlue, 'Creando tablas si no existen...');

        console.log(FgLightMagenta, '---Creando tabla users---');
        await connection.query(`
            CREATE TABLE IF NOT EXISTS users (
              id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
              email VARCHAR(100) NOT NULL UNIQUE,
              username VARCHAR(30) NOT NULL UNIQUE,
              password VARCHAR(100) NOT NULL,
              avatar VARCHAR(100) NULL,
              bio VARCHAR(200) NULL,
              createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
              modifiedAt DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
              registrationCode VARCHAR(100) NULL,
              isActive TINYINT UNSIGNED NOT NULL DEFAULT 0
            )
        `);

        // ON DELETE CASCADE: Si se borra un usuario, se borran sus productos.
        // ON UPDATE CASCADE: Si se actualiza un usuario, se actualizan sus productos.
        console.log(FgLightMagenta, '---Creando tabla products---');
        await connection.query(`
            CREATE TABLE IF NOT EXISTS products (
              id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
              productName VARCHAR(150) NOT NULL,
              description VARCHAR(200) NOT NULL,
              category ENUM('Audio', 'Cámaras de fotos', 'Consolas', 'Juguetes', 'Máquinas de escribir', 'Ordenadores', 'Relojes', 'Teléfonos', 'Televisores', 'Video', 'Otros') NOT NULL,
              state ENUM('Nuevo', 'Como nuevo', 'En buen estado', 'En condiciones aceptables', 'No funciona') NOT NULL,
              place VARCHAR(30) NULL,
              price DECIMAL(6,2) NULL,
              image VARCHAR(100),
              createdAt DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
              modifiedAt DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
              isSelled TINYINT UNSIGNED DEFAULT 0 NOT NULL,
              userId INT UNSIGNED NOT NULL,
              FOREIGN KEY (userId) REFERENCES users (id)
                ON DELETE CASCADE
                ON UPDATE CASCADE
            )
        `);
        console.log(FgLightMagenta, '---Creando tabla bookings---');
        await connection.query(`
            CREATE TABLE IF NOT EXISTS bookings (
              id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
              resno VARCHAR(100) NOT NULL UNIQUE,
              deliveryPlace VARCHAR(30) NULL,
              deliveryTime DATETIME NULL,
              createdAt DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
              userBuyerId INT UNSIGNED NOT NULL,
              FOREIGN KEY (userBuyerId) REFERENCES users (id)
                ON DELETE CASCADE
                ON UPDATE CASCADE,
              productId INT UNSIGNED NOT NULL,
              FOREIGN KEY (productId) REFERENCES products (id)
                ON DELETE CASCADE
                ON UPDATE CASCADE
            )
        `);

        console.log(FgLightMagenta, '---Creando tabla reviews---');
        await connection.query(`
            CREATE TABLE IF NOT EXISTS reviews (
              id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
		          titleRw VARCHAR(100) NOT NULL,
		          textRw VARCHAR(200) NULL,
              starsRw ENUM('1', '2', '3', '4', '5') NOT NULL,
              createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
              modifiedAt DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
              bookingId INT UNSIGNED NOT NULL,
              FOREIGN KEY (bookingId) REFERENCES bookings (id)
                ON DELETE CASCADE
                ON UPDATE CASCADE
            )
        `);

        console.log(FgLightGreen, '¡Tablas creadas con éxito!');

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
      (9, 'Televisor retro decorativo', 'Televisor antiguo Zenith de la década de 1960 en buen estado visual, pero no funcional. Ideal para decoración', 'Televisores', 'No funciona', 'Bilbao', 36, 'televisor.jpg', NOW(), NULL, 0, 6),
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
        console.error(FgLightRed, 'Error al crear las tablas:', err);
    } finally {
        // Si existe una conexión la liberamos.
        if (connection) connection.release();

        // Finalizamos el proceso.
        process.exit();
    }
};

// Llamamos a la función anterior para poder ejecutarla.
main();

// backupDb();
