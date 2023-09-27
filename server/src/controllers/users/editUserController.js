import savePhoto from '../../utils/savePhoto.js';
import validateSchema from '../../utils/validateSchema.js';
import editUserSchema from '../../schemas/users/editUserSchema.js';
import editUserModel from '../../models/users/editUserModel.js';
import { generatePhotoName } from '../../helpers/encripters.js';
import selectUserByIdModel from '../../models/users/selectUserByIdModel.js';
import deletePhoto from '../../utils/deletePhoto.js';

const editUserController = async (req, res, next) => {
    console.log('Esto entra?????');
    const validate = {
        bio: req.body.bio,
        avatar: req.files?.avatar,
    };

    try {
        await validateSchema(editUserSchema, validate);
        try {
            const hashedName = generatePhotoName();
            await savePhoto(req.files.avatar, hashedName, 'avatars');
            const dataUser = await selectUserByIdModel(req.user);

            const actualPhotoName = dataUser.avatar;
            if (actualPhotoName) {
                await deletePhoto(actualPhotoName, 'avatars');
            }
            // console.log('WTF', actualPhotoName);
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
