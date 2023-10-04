// //importamos las dependencia React router dom
import { Routes, Route } from 'react-router-dom';
// import { NavLink } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import ProfilePage from './pages/ProfilePage/ProfilePage';
// import Navbar from './components/Navbar/Navbar';
import FilteredPage from './pages/FilteredPage/FilteredPage';

// importamos los componentes

//importamos las páginas
import HomePage from './pages/HomePage/HomePage';
// import FilteredPage from './pages/FilteredPage/FilteredPage';
import Navbar from './components/Navbar/Navbar';
import ProductPage from './pages/ProductPage/ProductPage';

const App = () => {
    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover={false}
                theme="light"
            />
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/search" element={<FilteredPage />} />
                <Route path="/search/:category" element={<FilteredPage />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/product/" element={<ProductPage />} />
            </Routes>
        </>
    );
};

export default App;
