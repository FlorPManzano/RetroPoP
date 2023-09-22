import selectUserByIdModel from '../models/users/selectUserByIdModel.js';

const usersExists = async (req, res, next) => {
    try {
        const user = await selectUserByIdModel(req.user);
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
};

export default usersExists;
