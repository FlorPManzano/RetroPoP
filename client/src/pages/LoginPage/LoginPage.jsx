import './LoginPage.css';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { userNameRegisterRegex } from '../../utils/regex.js';
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

        if (!userNameRegisterRegex.test(e.target[0].value)) {
            return toast.error(
                'El nombre de usuario tiene que tener entre 4 y 20 carácteres'
            );
        }

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

    const [passReg, setPassReg] = useState('password');
    const [passRepeatReg, setPassRepeatReg] = useState('password');
    const [passLog, setPassLog] = useState('password');
    const [imgPassReg, setImgPassReg] = useState('icons/eye-open.png');
    const [imgPassRepeatReg, setImgPassRepeatReg] =
        useState('icons/eye-open.png');
    const [imgPassLog, setImgPassLog] = useState('icons/eye-open.png');
    const [passRegLength, setPassRegLength] = useState(0);
    const [passRepeatRegLength, setPassRepeatRegLength] = useState(0);
    const [passLogLength, setPassLogLength] = useState(0);

    const handleClickEyePassReg = () => {
        setPassReg(passReg === 'password' ? 'text' : 'password');
        setImgPassReg(
            imgPassReg === 'icons/eye-open.png'
                ? 'icons/eye-close.png'
                : 'icons/eye-open.png'
        );
    };

    const handleClickEyePassRepeatReg = () => {
        setPassRepeatReg(passRepeatReg === 'password' ? 'text' : 'password');
        setImgPassRepeatReg(
            imgPassRepeatReg === 'icons/eye-open.png'
                ? 'icons/eye-close.png'
                : 'icons/eye-open.png'
        );
    };

    const handleClickEyePassLog = () => {
        setPassLog(passLog === 'password' ? 'text' : 'password');
        setImgPassLog(
            imgPassLog === 'icons/eye-open.png'
                ? 'icons/eye-close.png'
                : 'icons/eye-open.png'
        );
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
                                <input
                                    type={passReg}
                                    onChange={(e) =>
                                        setPassRegLength(e.target.value.length)
                                    }
                                    required
                                    className="input-pass-reg"
                                ></input>
                                {passRegLength > 2 && (
                                    <img
                                        onClick={handleClickEyePassReg}
                                        className="eye"
                                        src={imgPassReg}
                                        alt="eye"
                                        width="30"
                                    />
                                )}
                                <label htmlFor="">Contraseña</label>
                            </div>
                            <div className="input-group">
                                <input
                                    type={passRepeatReg}
                                    onChange={(e) =>
                                        setPassRepeatRegLength(
                                            e.target.value.length
                                        )
                                    }
                                    required
                                />
                                {passRepeatRegLength > 2 && (
                                    <img
                                        onClick={handleClickEyePassRepeatReg}
                                        className="eye"
                                        src={imgPassRepeatReg}
                                        alt="eye"
                                        width="30"
                                    />
                                )}
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
                                <input
                                    type={passLog}
                                    onChange={(e) =>
                                        setPassLogLength(e.target.value.length)
                                    }
                                    required
                                />
                                {passLogLength > 2 && (
                                    <img
                                        onClick={handleClickEyePassLog}
                                        className="eye"
                                        src={imgPassLog}
                                        alt="eye"
                                        width="30"
                                    />
                                )}

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
