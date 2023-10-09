// //importamos las dependencia React router dom
import { Routes, Route } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// importamos los componentes

//importamos las páginas
import LoginPage from './pages/LoginPage/LoginPage';
import HomePage from './pages/HomePage/HomePage';
import FilteredPage from './pages/FilteredPage/FilteredPage';
import Navbar from './components/Navbar/Navbar';
import ProductPage from './pages/ProductPage/ProductPage';
import ValidateUserPage from './pages/ValidateUserPage/ValidateUserPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import ProductCreateForm from './forms/ProductCreateForm/ProductCreateForm';
import PrivateRoutes from './components/PrivateRoutes';
import Loader from './components/Loader/Loader';
import BookingsPage from './pages/BookingsPage/BookingsPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';

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
                <Route path="/loader" element={<Loader />} />
                <Route
                    path="/validate/:regCode"
                    element={<ValidateUserPage />}
                />

                <Route path="*" element={<NotFoundPage />} />

                <Route element={<PrivateRoutes />}>
                    <Route path="/upload/" element={<ProductCreateForm />} />
                    <Route
                        path="/profile/bookings"
                        element={<BookingsPage />}
                    />

                    <Route path="/profile" element={<ProfilePage />} />
                </Route>
            </Routes>
        </>
    );
};

export default App;
