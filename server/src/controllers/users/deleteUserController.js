import deleteUserModel from '../../models/users/deleteUserModel.js';

const deleteUserController = async (req, res) => {
    try {
        const { id } = req.user;
        const data = await deleteUserModel(id);
        res.send({
            status: 'ok',
            message: 'Usuario eliminado correctamente',
        });
    } catch (err) {
        res.send(err);
    }
};

export default deleteUserController;
