// Importamos las dependencias necesarias para crear la conexión a MySQL
import { createConnection, createPool } from 'mysql2/promise';

// Importamos los colores para la consola
import { FgLightRed } from '../helpers/colorsNode.js';

// Importamos las variables de entorno
import 'dotenv/config';

// Obtenemos las variables de entorno (.env) necesarias para iniciar la conexión
const { MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_DB } = process.env;

// La variable pool almacenará un conjunto de conexiones
let pool;

// Función que retorna una conexión libre con la base de datos.
const getDb = async () => {
    // Como retorna una promesa, hay que meter el código en un bloque try/catch
    // Para gestionar los errores que puedas surgir al conectar a la BBDD
    try {
        // Si la variable "pool" es undefined...
        if (!pool) {
            // Creamos una conexión con el servidor MySQL.
            const connection = await createConnection({
                host: MYSQL_HOST,
                user: MYSQL_USER,
                password: MYSQL_PASS,
                timezone: 'local',
            });

            // Creamos la base de datos si no existe.
            await connection.query(`CREATE DATABASE IF NOT EXISTS ${MYSQL_DB}`);

            // Creamos el grupo de conexiones.
            pool = createPool({
                connectionLimit: 10,
                host: MYSQL_HOST,
                user: MYSQL_USER,
                password: MYSQL_PASS,
                database: MYSQL_DB,
                timezone: 'local',
            });
        }

        // Finalmente, retornamos una conexión libre con la base de datos.
        return await pool.getConnection();
    } catch (err) {
        console.error(FgLightRed, 'Error al conectar a la base de datos', err);
    }
};
export default getDb;
