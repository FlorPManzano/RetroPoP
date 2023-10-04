import './LoginPage.css';
import {
    loginUserService,
    registerUserService,
} from '../../services/fetchData.js';

import { toast } from 'react-toastify';

export default function LoginPage() {
    const toastError = (errMsg) => toast.error(errMsg);
    const toastSuccess = (msg) => toast.success(msg);

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

    const registerSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = {
                username: e.target[0].value,
                email: e.target[1].value,
                password: e.target[2].value,
            };

            if (e.target[2].value !== e.target[3].value)
                return toastError('Las contraseñas no coinciden');

            const newUser = await registerUserService(
                data.username,
                data.email,
                data.password
            );
            console.log(newUser);
            newUser.status === 'error'
                ? toastError(newUser.message)
                : toastSuccess(newUser.message);
        } catch (error) {
            error.message === 'Failed to fetch'
                ? toastError('Error de conexión')
                : toastError(error.message);
        }
    };

    const LoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = {
                email: e.target[0].value,
                password: e.target[1].value,
            };

            const user = await loginUserService(data.email, data.password);
            if (user.status === 'ok') {
                localStorage.setItem(user.data.username, user.data.token);
            }
            toast.success(`Bienvenido ${user.data.username}`);
            user.status === 'error'
                ? toastError(user.message)
                : toastSuccess(user.message);
        } catch (error) {
            error.message === 'Failed to fetch'
                ? toastError('Error de conexión')
                : toastError(error.message);
        }
    };

    return (
        <>
            {/* <img src="public/iconRetroPop.png" className="logo-grande" alt="" /> */}
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
                                <input type="text" />
                                <label htmlFor="">Email</label>
                            </div>
                            <div className="input-group">
                                <input type="password" required />
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
