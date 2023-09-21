// Importamos las dependencias
import express from 'express';
import fileUpload from 'express-fileupload';

// importamos la constante que contiene el nombre
import UPLOADS_DIR from './src/utils/constants';

// importamos las rutas
import routes from './src/routes';

// importamos las funciones controladoras de errores
import { errorNotFoundController, errorController } from './src/errors';

//creamos el servidor
const app = express();

// Middleware que indica a Express cual es el directorio de ficheros estáticos.
app.use(express.static(UPLOADS_DIR));

// Middleware que deserializa un body en formato "form-data" creando la propiedad "body" y
// la propiedad "files" en el objeto "request". PREGUNTAR A LOS CHICOS COMO FUNCIONA
app.use(fileUpload());

// Middleware que indica a express donde se encuentran las rutas.
app.use(routes);

// Middleware de ruta no encontrada.
app.use(errorNotFoundController);

// Middleware de error.
// eslint-disable-next-line no-unused-vars
app.use(errorController);
