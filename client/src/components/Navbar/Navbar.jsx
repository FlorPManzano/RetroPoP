import './Navbar.css';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
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
                    src="public/logo-retropop.png"
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

                <button
                    className="upload-product"
                    style={{ cursor: 'pointer' }}
                >
                    <img src="public/icons/add-product.png" alt="" width="50" />{' '}
                    Subir producto
                </button>

                <img
                    src="public/icons/login.png"
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
