// Importamos las variables de entorno de nuestro fichero ".env".
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
              description VARCHAR(200) NULL,
              category ENUM('Consolas', 'Videojuegos', 'Audio', 'Ordenadores', 'Video', 'Cámaras de fotos', 'Maquinas de escribir') NOT NULL,
              state ENUM('Sin abrir', 'Nuevo', 'Como nuevo', 'En buen estado', 'En condiciones aceptables') NOT NULL,
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
              userSellerId INT UNSIGNED NOT NULL,
              FOREIGN KEY (userSellerId) REFERENCES users (id)
                ON DELETE CASCADE
                ON UPDATE CASCADE,
              userBuyerId INT UNSIGNED NOT NULL,
              FOREIGN KEY (userBuyerId) REFERENCES users (id)
                ON DELETE CASCADE
                ON UPDATE CASCADE
            )
        `);

        console.log(FgLightGreen, '¡Tablas creadas con éxito!');
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
