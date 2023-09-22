import savePhoto from '../../utils/savePhoto.js';
import validateSchema from '../../utils/validateSchema.js';
import editUserSchema from '../../schemas/users/editUserSchema.js';
import editUserModel from '../../models/users/editUserModel.js';
import { generatePhotoName } from '../../helpers/encripters.js';

const editUserController = async (req, res, next) => {
    const obj = {
        bio: req.body.bio,
        avatar: {
            name: req.files?.avatar?.name,
            mimetype: req.files?.avatar?.mimetype,
            size: req.files?.avatar?.size,
        },
    };

    try {
        await validateSchema(editUserSchema, obj);
        try {
            const hashedName = generatePhotoName();
            await savePhoto(req.files.avatar, hashedName, 'avatars');
            await editUserModel(req.user, req.body.bio, hashedName);
        } catch (error) {}
        res.send({
            status: 'ok',
            message: 'Usuario editado correctamente',
        });
    } catch (error) {
        next(error);
    }
};

export default editUserController;
