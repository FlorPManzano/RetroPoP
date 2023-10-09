import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { NavLink } from 'react-router-dom';
import { APIUrl } from '../../config';
import { useState } from 'react';

const Navbar = () => {
    const { authToken, authUser, authLogout } = useAuth();

    const [showMenu, setShowMenu] = useState(false);
    const toggleMenu = () => setShowMenu(!showMenu);

    const [avatar, setAvatar] = useState(null);

    const navigate = useNavigate();
    const handleSubmitSearch = (e) => {
        if (e.key === 'Enter') {
            navigate(`/search/?name=${e.target.value}`);
        }
    };

    const handleClickHome = () => {
        document.querySelector('.search-form').value = '';
        navigate('/');
    };

    const handleClickLogin = (e) => {
        e.stopPropagation();
        toggleMenu();
        document.querySelector('.search-form').value = '';
        navigate('/login');
    };

    const handleClickAvatar = (e) => {
        e.stopPropagation();
        toggleMenu();
    };

    return (
        <>
            <nav className="navbar">
                <img
                    src="/logo-retropop.png"
                    className="logo"
                    alt=""
                    onClick={handleClickHome}
                    style={{ cursor: 'pointer' }}
                />

                <input
                    type="text"
                    className="search-form"
                    onKeyDown={handleSubmitSearch}
                />

                {authToken && (
                    <NavLink to="/upload">
                        <button
                            className="upload-product"
                            style={{ cursor: 'pointer' }}
                        >
                            <img
                                src="/icons/add-product.png"
                                alt=""
                                width="50"
                            />{' '}
                            Subir producto
                        </button>
                    </NavLink>
                )}

                <div>
                    {!authUser ? (
                        <img
                            className="user"
                            src="/icons/login.png"
                            onClick={handleClickLogin}
                        ></img>
                    ) : (
                        <div>
                            <img
                                onClick={handleClickAvatar}
                                className="user"
                                src={
                                    authUser.avatar
                                        ? `${APIUrl}/avatars/${authUser.avatar}`
                                        : '/icons/acceso.png'
                                }
                                alt="Avatar"
                            />

                            {showMenu && (
                                <div
                                    className="dropdown-menu"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <ul>
                                        <NavLink to="/profile">
                                            <li>Ver perfil</li>
                                        </NavLink>
                                        <NavLink to="/profile/bookings">
                                            <li>Solicitudes</li>
                                        </NavLink>
                                        <li onClick={authLogout}>
                                            Cerrar sesión
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </nav>
        </>
    );
};

export default Navbar;
