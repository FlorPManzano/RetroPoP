// Importamos el módulo de express
import express from 'express';

// Importamos el módulo de cors
import cors from 'cors';

// Importamos el módulo de dotenv
import 'dotenv/config';

// Importamos el módulo de morgan
import morgan from 'morgan';

// Importamos Routes
import userRoutes from './src/routes/usersRoutes';
// import bookingsRoutes from './src/routes/bookings_routes.js';
// import productsRoutes from './src/routes/products_routes.js';
// import reviewsRoutes from './src/routes/reviews_routes.js';

// Importamos el puerto y el host de config.js
import { PORT } from './config.js';

// Guardamos en una constante la función express
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('common'));

// Routes
// app.use('/bookings', bookingsRoutes);
// app.use('/products', productsRoutes);
// app.use('/reviews', reviewsRoutes);
app.use('/users', userRoutes);

// Inicializamos el servidor en el puerto asignado en config.js
app.listen(PORT, () => {
    console.log(`El servidor está inicializado en http://localhost:${PORT}`);
});
