import express from 'express';
const app = express();
app.use(express.json());
const editAvatarUserController = async (req, res) => {
    // console.log('Esto llega desde editAvatar', req.user);

    try {
        if (!req.files) {
            res.status(400).send({
                status: 'error',
                message: 'No se ha enviado ninguna imagen',
            });
        } else {
            const { avatar } = req.files;
            console.log('avatar?', avatar);

            res.send({
                status: 'ok',
                message: 'Avatar subido correctamente',
            });
        }
    } catch (error) {
        next(error);
    }
};

export default editAvatarUserController;
