import newReviewModel from '../../models/reviews/newReviewModel.js';

const newReviewController = async (req, res) => {
    try {
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
