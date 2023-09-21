// Importamos las dependencias
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import fileUpload from 'express-fileupload';

// Importamos las variables de entorno
import 'dotenv/config';

// Importamos la constante con el nombre de carpeta de la subida de archivos
import { UPLOADS_DIR } from './config.js';

// Importamos Routes
import userRoutes from './src/routes/usersRoutes.js';
// import bookingsRoutes from './src/routes/bookingsRoutes.js';
// import productsRoutes from './src/routes/productsRoutes.js';
// import reviewsRoutes from './src/routes/reviewsRoutes.js';

//Importamos los controladores de errores
import errorNotFoundController from './src/errors/errorNotFoundController.js';
import errorController from './src/errors/errorController.js';

// Importamos el puerto y el host de config.js
import { PORT } from './config.js';

// Creamos el servidor de express
const server = express();

// Middlewares
// Deserializa un body en formato "raw" creando la propiedad "body" en el objeto "request".
server.use(express.json());
// Evita problemas con las CORS cuando intentamos conectar el cliente con el servidor
server.use(cors());
// Muestra por consola información de la petición entrante
server.use(morgan('common'));
// Middleware que deserializa un body en formato "form-data" creando la propiedad "body" y
// la propiedad "files" en el objeto "request".
server.use(fileUpload());
// Indica a Express cual es el directorio de ficheros estáticos.
// server.use(express.static(UPLOADS_DIR)); <<-- Esto no funciona da error

// Routes
server.use('/users', userRoutes);
// server.use('/bookings', bookingsRoutes);
// server.use('/products', productsRoutes);
// server.use('/reviews', reviewsRoutes);

// Middelware de ruta no encontrada
server.use(errorNotFoundController);
// Middleware de error.
server.use(errorController);

// Inicializamos el servidor en el puerto asignado en config.js
server.listen(PORT, () => {
    console.log(`El servidor está inicializado en http://localhost:${PORT}`);
});
