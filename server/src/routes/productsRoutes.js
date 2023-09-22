// -   POST `/` - Permite crear un producto.
// -   GET `/` - Lista todos los productos.
// -   GET `/:productId` - Devuelve la infomación del producto.
// -   GET `/?param` - Devuelve la infomación de los productos filtrados.
// -   PUT `/edit` - Editar producto.
// -   DELETE `/:productId` - Borra un producto solo si eres quien lo creó.

import express from 'express';

// Controllers
import newProductController from '../controllers/products/newProductController.js';

// Middlewares
import authUser from '../middlewares/authUser.js';

// Router
const router = express.Router();

// Routes
// POST `/` - Permite crear un producto.
router.post('/', authUser, newProductController);

export default router;
