import newReviewModel from '../../models/reviews/newReviewModel.js';
import newReviewSchema from '../../schemas/reviews/newReviewSchema.js';
import validateSchema from '../../utils/validateSchema.js';
import getReviewsModel from '../../models/reviews/getReviewsModel.js';

const getReviewsController = async (req, res) => {
    try {
        const id = req.user;

        const reviews = await getReviewsModel(id);

        res.send({
            status: 'ok',
            reviews,
        });
    } catch (err) {
        res.send(err);
    }
};

export default getReviewsController;
