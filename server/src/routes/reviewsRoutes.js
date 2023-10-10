// -   POST `/:orderId` - Permite añadir una valoración al vendedor.
// -   GET `/:userId` - Lista las reviews de un usuario.
import express from 'express';
import authUser from '../middlewares/authUser.js';

// Controllers
import newReviewController from '../controllers/reviews/newReviewController.js';
import reviewExist from '../middlewares/reviewExist.js';
import reviewOnTime from '../middlewares/reviewOnTime.js';
import authUserIsOwnerBooking from '../middlewares/authUserIsOwnerBooking.js';
import checkBookingExist from '../middlewares/checkBookingExist.js';
import getReviewsController from '../controllers/reviews/getReviewsController.js';

const router = express.Router();

router.post(
    '/:resno',
    authUser,
    checkBookingExist,
    authUserIsOwnerBooking,
    reviewExist,
    reviewOnTime,
    newReviewController
);

router.get('/', authUser, getReviewsController);

export default router;
