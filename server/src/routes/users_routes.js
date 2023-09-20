import express from 'express';

// Controllers
import userController from '../controllers/user_controllers.js';

// Middlewares
// import authUser from '../middlewares/auth_user.js';
// import userExists from '../middlewares/user_exists.js';

// Router
const router = express.Router();

// Routes
// POST /users/
router.post('/', userController.createUser);

// POST /users/validate/e20b73bc-ab27-4edc-823b-807fba206bec
// router.post('/validate/:regCode', userController.validateUser);

// POST /users/login
// router.post('/login', userController.loginUser);

// GET /users/1
router.get('/:id', (req, res) => {
    const data = req.params.id;
    res.send(`Esta es la info del usuario ${data}`);
});
// router.get('/:userId', authUser, userExists, userController.getUser);

// PUT /users/edit
// router.put('/edit', authUser, userExists, userController.editUserAvatar);

// PUT /users/recover-password
// router.put('/recover-password', userController.sendRecoverPass);

// PUT /users/reset-password
// router.put('/reset-password', userController.editUserPass);

// DELETE /users/1
// router.delete('/users/:id', authUser, userExists, userController.deleteUser);

export default router;
