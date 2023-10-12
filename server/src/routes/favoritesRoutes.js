import express from 'express';
import authUser from '../middlewares/authUser.js';
import setFavController from '../controllers/favorites/setFavController.js';
import getFavController from '../controllers/favorites/getFavController.js';
// Controllers

// Router
const router = express.Router();

router.put('/', authUser, setFavController);
router.get('/', authUser, getFavController);

export default router;
