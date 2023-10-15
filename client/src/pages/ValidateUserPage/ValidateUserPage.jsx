import { validateUserService } from '../../services/fetchData';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ValidateUserPage.css';
import Loader from '../../components/Loader/Loader';
import useAuth from '../../hooks/useAuth.js';
import { userLocalStorageKey } from '../../config';

import { useNavigate } from 'react-router-dom';

export default function ValidateUserPage() {
    const { setAuthToken } = useAuth();

    const navigate = useNavigate();

    const [userValidate, setUserValidate] = useState({});
    const [loading, setLoading] = useState(false);
    const [colorText, setColorText] = useState('red');
    const regCodeParam = useParams().regCode;

    useEffect(() => {
        const validateFunction = async () => {
            try {
                setLoading(true);
                const body = await validateUserService(regCodeParam);
                setUserValidate(body);
                const token = await body?.token;

                if (body.status === 'ok') {
                    setColorText('green');
                }

                if (body.status === 'error') {
                    setColorText('red');
                }

                const returnHome = () => {
                    setTimeout(() => {
                        setAuthToken(token);
                        localStorage.setItem(userLocalStorageKey, token);
                        navigate('/');
                    }, 3000);
                };

                if (token) {
                    returnHome();
                }
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        validateFunction();
    }, [navigate, regCodeParam, setAuthToken]);

    return (
        <div className="container-main">
            <div className="container-main__content">
                {loading ? (
                    <Loader />
                ) : (
                    <h2 style={{ color: `${colorText}` }}>
                        {userValidate.message}
                    </h2>
                )}
                {userValidate.status === 'ok' && (
                    <h3 className="redirige-h3">
                        Redirigiendo a la página principal...
                    </h3>
                )}
            </div>
        </div>
    );
}
