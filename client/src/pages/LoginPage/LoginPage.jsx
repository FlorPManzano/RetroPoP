import './LoginPage.css';
import fetchData from '../../services/fetchData.js';

export default function LoginPage() {
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
        const data = {
            username: e.target[0].value,
            email: e.target[1].value,
            password: e.target[2].value,
        };

        const newUser = await fetchData('users', 'POST', data);
        console.log(newUser);
    };

    return (
        <>
            <img src="public/iconRetroPop.png" className="logo" alt="" />
            <div className="wrapper">
                <div className="form-wrapper sign-up">
                    <form action="" onSubmit={registerSubmit}>
                        <h2>Registro</h2>
                        <div className="input-group">
                            <input type="text" required />
                            <label htmlFor="">Usuario</label>
                        </div>
                        <div className="input-group">
                            <input type="email" required />
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
                    <form action="">
                        <h2>Login</h2>
                        <div className="input-group">
                            <input type="text" required />
                            <label htmlFor="">Usuario</label>
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
        </>
    );
}
