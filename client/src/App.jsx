//importamos las dependencia React router dom
import { Routes, Route } from 'react-router-dom';

// importamos los componentes
import Footer from './components/Footer';
import Header from './components/Header';
import Main from './components/Main';
import Navbar from './components/Navbar';

//importamos las páginas
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import RegisterPage from './pages/RegisterPage';

const App = () => {
    return (
        <>
            <div className="app"></div>
            <Header />
            <Main />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/profile" element={<ProfilePage />} />
            </Routes>
            <Navbar />
            <Footer />
        </>
    );
};

export default App;
