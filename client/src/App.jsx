//importamos las dependencia React router dom
// import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
// import HomePage from './pages/HomePage/HomePage';
// import ProfilePage from './pages/ProfilePage/ProfilePage';

// importamos los componentes

//importamos las páginas

const App = () => {
    return (
        <>
            <LoginPage />
            {/* <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/profile" element={<ProfilePage />} />
            </Routes> */}
        </>
    );
};

export default App;
