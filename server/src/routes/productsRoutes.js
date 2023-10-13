// -   POST `/` - Permite crear un producto.
// -   GET `/` - Lista todos los productos.

// -   GET `/?param` - Devuelve la infomación de los productos filtrados.
// -   PUT `/edit` - Editar producto.
// -   DELETE `/:productId` - Borra un producto solo si eres quien lo creó.

import express from 'express';

// Controllers
import newProductController from '../controllers/products/newProductController.js';
import getListProductsController from '../controllers/products/getListProductsController.js';
import getProductController from '../controllers/products/getProductController.js';
import getListProductsFilterController from '../controllers/products/getListProductsFilterController.js';
import deleteProductController from '../controllers/products/deleteProductController.js';
import checkProductIsOwner from '../middlewares/checkProductIsOwner.js';

// Middlewares
import authUser from '../middlewares/authUser.js';

// Router
const router = express.Router();

// Routes

router.delete('/', authUser, checkProductIsOwner, deleteProductController);

// -   GET `/?param` - Devuelve la infomación de los productos filtrados.
router.get('/filters/?', getListProductsFilterController);
// GET `/` - Lista todos los productos.
router.get('/', getListProductsController);

// -   GET `/:productId` - Devuelve la infomación del producto.
router.get('/:productId', getProductController);

// POST `/` - Permite crear un producto.
router.post('/', authUser, newProductController);

export default router;
