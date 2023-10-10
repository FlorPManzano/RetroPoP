import express from 'express';
import authUser from '../middlewares/authUser.js';
import newFavController from '../controllers/favorites/newFavController.js';
import deleteFavController from '../controllers/favorites/deleteFavController.js';
// Controllers

import router from './reviewsRoutes.js';

router.post('/', authUser, newFavController);
router.get('/', authUser, deleteFavController);

export default router;
