// -   POST `/users` - Registro de usuario.
// -   POST `/users/login` - Login de usuario (devuelve token).
// -   POST `/users/validate/:regCode` - Permite validar un usuario.
// -   GET `/users/:userId` - Devuelve información del usuario del token.
// -   PUT `/users/edit` - Editar perfil.

import express from 'express';

// Controllers
import createUserController from '../controllers/users/createUserController.js';
import activateUserController from '../controllers/users/activateUserController.js';
import loginUserController from '../controllers/users/loginUserController.js';
import editUserController from '../controllers/users/editUserController.js';
import getProfileController from '../controllers/users/getProfileController.js';
import deleteUserController from '../controllers/users/deleteUserController.js';

// Middlewares
import authUser from '../middlewares/authUser.js';
import userExists from '../middlewares/userExists.js';
import getProductsUserController from '../controllers/users/getProductsUserController.js';

// Router
const router = express.Router();

// Routes
// POST /users/
router.post('/', createUserController);

router.get('/products/:id', getProductsUserController);

router.get('/profile/', authUser, getProfileController);

router.post('/validate/:regCode', activateUserController);

router.post('/delete', authUser, userExists, deleteUserController);

// POST /users/validate/e20b73bc-ab27-4edc-823b-807fba206bec
// router.post('/validate/:regCode', userController.validateUser);

// POST /users/login
router.post('/login', loginUserController);

// PUT /users/edit
router.put('/edit', authUser, editUserController);

// PUT /users/recover-password
// router.put('/recover-password', userController.sendRecoverPass);

// PUT /users/reset-password
// router.put('/reset-password', userController.editUserPass);

// DELETE /users/1
// router.delete('/users/:id', authUser, userExists, userController.deleteUser);

export default router;
