import './Navbar.css';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <>
            <nav className="navbar">
                <NavLink to="/">
                    <img
                        src="public/iconRetroPop.png"
                        className="logo"
                        alt=""
                    />
                </NavLink>
                <input type="text" className="search-form" />
                <button className="upload-product">
                    <img src="public/icons/add-product.png" alt="" width="50" />{' '}
                    Subir producto
                </button>
                <NavLink to="/login">
                    <img src="public/icons/login.png" className="user" alt="" />
                </NavLink>
            </nav>
        </>
    );
};

export default Navbar;
