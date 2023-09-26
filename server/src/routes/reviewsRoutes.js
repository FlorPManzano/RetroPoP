// -   POST `/:orderId` - Permite añadir una valoración al vendedor.
// -   GET `/:userId` - Lista las reviews de un usuario.
import express from 'express';
import authUser from '../middlewares/authUser.js';

// Controllers
import newReviewController from '../controllers/reviews/newReviewController.js';
import reviewExist from '../middlewares/reviewExist.js';

const router = express.Router();

router.post('/:resno', authUser, reviewExist, newReviewController);

export default router;
