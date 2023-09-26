import { reviewExistsError } from '../errors/errorService.js';
import selectReviewModel from '../models/reviews/selectReviewModel.js';

const reviewExist = async (req, res, next) => {
    try {
        // Variable que almacenará el resultado de la consulta a la base de datos
        const review = await selectReviewModel(req.params.resno);

        if (review.length > 0) reviewExistsError();
        next();
    } catch (error) {
        next(error);
    }
};

export default reviewExist;
