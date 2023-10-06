import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useState } from 'react';

const Navbar = () => {
    const { authToken } = useAuth();
    console.log(authToken);

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

    const handleClickLogin = () => {
        document.querySelector('.search-form').value = '';
        navigate('/login');
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
                    <button
                        className="upload-product"
                        style={{ cursor: 'pointer' }}
                    >
                        <img src="/icons/add-product.png" alt="" width="50" />{' '}
                        Subir producto
                    </button>
                )}

                <img
                    src="/icons/login.png"
                    className="user"
                    alt=""
                    onClick={handleClickLogin}
                    style={{ cursor: 'pointer' }}
                />
            </nav>
        </>
    );
};

export default Navbar;
