// Función controladora final para el middleware de errores.
const errorNotFoundController = (err, req, res, next) => {
    console.error(err);

    res.status(err.httpStatus || 500).send({
        status: 'error',
        message: err.message,
    });
};
export default errorNotFoundController;
