import newReviewModel from '../../models/reviews/newReviewModel.js';
import newReviewSchema from '../../schemas/reviews/newReviewSchema.js';
import validateSchema from '../../utils/validateSchema.js';

const newReviewController = async (req, res) => {
    try {
        await validateSchema(newReviewSchema, req.body);

        const review = await newReviewModel(
            req.body,
            req.params.resno,
            req.user
        );

        res.send({
            status: 'ok',
            message: 'Valoración creada correctamente.',
            review,
        });
    } catch (err) {
        res.send(err);
    }
};

export default newReviewController;
