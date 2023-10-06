import './LoginPage.css';
// import {
//     loginUserService,
//     registerUserService,
// } from '../../services/fetchData.js';

// import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth.js';

export default function LoginPage() {
    const { authRegister, authLogin } = useAuth();

    // const toastError = (errMsg) => toast.error(errMsg);
    // const toastSuccess = (msg) => toast.success(msg);

    const signinClick = () => {
        const wrapper = document.querySelector('.wrapper');
        wrapper.classList.add('animate-signUp');
        wrapper.classList.remove('animate-signIn');
    };

    const singupClick = () => {
        const wrapper = document.querySelector('.wrapper');
        wrapper.classList.add('animate-signIn');
        wrapper.classList.remove('animate-signUp');
    };

    const registerSubmit = (e) => {
        e.preventDefault();

        authRegister({
            username: e.target[0].value,
            email: e.target[1].value,
            password: e.target[2].value,
            repeatedPass: e.target[3].value,
        });
    };

    const LoginSubmit = async (e) => {
        e.preventDefault();
        // try {
        authLogin({
            email: e.target[0].value,
            password: e.target[1].value,
        });
        // const data = {
        //     email: e.target[0].value,
        //     password: e.target[1].value,
        // };

        //     const user = await loginUserService(data.email, data.password);
        //     if (user.status === 'ok') {
        //         localStorage.setItem(user.data.username, user.data.token);
        //     }
        //     toast.success(`Bienvenido ${user.data.username}`);
        //     user.status === 'error'
        //         ? toastError(user.message)
        //         : toastSuccess(user.message);
        // } catch (error) {
        //     error.message === 'Failed to fetch'
        //         ? toastError('Error de conexión')
        //         : toastError(error.message);
        // }
    };

    return (
        <>
            <div className="container-login">
                <div className="wrapper">
                    <div className="form-wrapper sign-up">
                        <form action="" onSubmit={registerSubmit}>
                            <h2>Registro</h2>
                            <div className="input-group">
                                <input type="text" required />
                                <label htmlFor="">Usuario</label>
                            </div>
                            <div className="input-group">
                                <input type="text" required />
                                <label htmlFor="">Email</label>
                            </div>
                            <div className="input-group">
                                <input type="password" required></input>
                                <img
                                    className="eye"
                                    src="icons/eye-open.png"
                                    alt="eye"
                                    width="30"
                                />
                                <label htmlFor="">Contraseña</label>
                            </div>
                            <div className="input-group">
                                <input type="password" required />
                                <label htmlFor="">Repite la contraseña</label>
                            </div>
                            <button type="submit" className="btn">
                                Registro
                            </button>
                            <div className="sign-link">
                                <p>
                                    ¿Ya tienes una cuenta?{' '}
                                    <a
                                        href="#"
                                        className="signIn-link"
                                        onClick={signinClick}
                                    >
                                        Entra
                                    </a>
                                </p>
                            </div>
                        </form>
                    </div>

                    <div className="form-wrapper sign-in">
                        <form action="" onSubmit={LoginSubmit}>
                            <h2>Login</h2>
                            <div className="input-group">
                                <input type="text" required />
                                <label htmlFor="">Email</label>
                            </div>
                            <div className="input-group">
                                <input type="password" required />
                                <label htmlFor="">Contraseña</label>
                            </div>
                            <div className="forgot-pass">
                                <a href="#">¿Has olvidado la contraseña?</a>
                            </div>
                            <button type="submit" className="btn">
                                Entra
                            </button>
                            <div className="sign-link">
                                <p>
                                    ¿No tienes una cuenta?{' '}
                                    <a
                                        href="#"
                                        className="signUp-link"
                                        onClick={singupClick}
                                    >
                                        ¡Registrate!
                                    </a>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
