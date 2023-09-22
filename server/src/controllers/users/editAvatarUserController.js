import express from 'express';
import savePhoto from '../../utils/savePhoto.js';
const app = express();
app.use(express.json());

const editUserAvatarController = async (req, res) => {
    // console.log('Esto llega desde editAvatar', req.user);

    try {
        if (!req.files) {
            res.status(400).send({
                status: 'error',
                message: 'No se ha enviado ninguna imagen',
            });
        } else {
            const { avatar } = req.files;
            savePhoto(avatar, 'avatars');

            res.send({
                status: 'ok',
                message: 'Avatar subido correctamente',
            });
        }
    } catch (error) {
        next(error);
    }
};

export default editUserAvatarController;
