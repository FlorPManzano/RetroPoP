import './Navbar.css';

const Navbar = () => {
    return (
        <>
            <nav className="navbar">
                <img src="public/iconRetroPop.png" className="logo" alt="" />
                <input type="text" className="search-form" />
                <button className="upload-product">Subir producto</button>
                <button className="login" />
            </nav>
        </>
    );
};

export default Navbar;
