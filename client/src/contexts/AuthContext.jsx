// Importamos los prop-types.
import PropTypes from 'prop-types';

// Importamos la función que crea un contexto y los hooks.
import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Importamos el nombre con el que guardamos el token en el localStorage.
import { userLocalStorageKey } from '../config';

// Importamos los servicios.
import {
    getUserProfileService,
    loginUserService,
    registerUserService,
    editUserService,
} from '../services/fetchData.js';
import { toast } from 'react-toastify';

// Creamos un contexto.
export const AuthContext = createContext(null);

// Creamos el componente provider del contexto.
export const AuthProvider = ({ children }) => {
    const toastError = (errMsg) => toast.error(errMsg);
    const toastSuccess = (msg) => toast.success(msg);
    const navigate = useNavigate();

    const [authToken, setAuthToken] = useState(
        localStorage.getItem(userLocalStorageKey)
    );
    const [authUser, setAuthUser] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Función que obtiene los datos del usuario.
        const fetchUser = async () => {
            try {
                setLoading(true);

                const body = await getUserProfileService(authToken);
                console.log(body);

                if (body.status === 'error') {
                    // Manejamos los errores con toast.
                }

                // Establecemos el valor del usuario.
                setAuthUser(body);
            } catch (err) {
                // Manejamos los errores con toast.
            } finally {
                setLoading(false);
            }
        };

        // Si existe token buscamos los datos del usuario.
        if (authToken) fetchUser();
    }, [authToken]);

    // Función de registro.
    const authRegister = async ({
        username,
        email,
        password,
        repeatedPass,
    }) => {
        console.log('ey', username, email, password, repeatedPass);
        try {
            setLoading(true);

            // Manejar el error de las contraseñas no coinciden.
            if (password !== repeatedPass)
                return toastError('Las contraseñas no coinciden');

            const body = await registerUserService(username, email, password);

            body.status === 'error'
                ? toastError(body.message)
                : toastSuccess(body.message);

            navigate('/login');
        } catch (err) {
            err.message === 'Failed to fetch'
                ? toastError('Error de conexión')
                : toastError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Función de login.
    const authLogin = async ({ email, password }) => {
        try {
            setLoading(true);

            const body = await loginUserService(email, password);

            body.status === 'error'
                ? toastError(body.message)
                : toastSuccess(body.message);

            // Almacenamos el token en el localStorage.
            localStorage.setItem(userLocalStorageKey, body.data.token);

            // Almacenamos el token en el State.
            setAuthToken(body.data.token);
            navigate('/');
        } catch (err) {
            if (err.message === 'Failed to fetch')
                toastError('Error de conexión');
        } finally {
            setLoading(false);
        }
    };

    // Función de logout.
    const authLogout = async () => {
        // Eliminamos el token del localStorage.
        localStorage.removeItem(userLocalStorageKey);

        // Eliminamos el token del State y el usuario.
        setAuthToken(null);
        setAuthUser(null);
    };

    // Función de actualización de perfil.
    const authUpdateProfile = async (updatedProfile) => {
        try {
            setLoading(true);

            // Realiza la solicitud para actualizar el perfil del usuario utilizando editUserService
            const response = await editUserService(authToken, updatedProfile);

            if (response.status === 'success') {
                // Actualiza el usuario en el estado
                setAuthUser({ ...authUser, ...updatedProfile });

                toastSuccess('Perfil actualizado con éxito');
            } else {
                toastError('Error al actualizar el perfil');
            }
        } catch (error) {
            toastError('Error al actualizar el perfil');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                authUser,
                authRegister,
                authLogin,
                authLogout,
                loading,
                authToken,
                setAuthToken,
                authUpdateProfile,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
