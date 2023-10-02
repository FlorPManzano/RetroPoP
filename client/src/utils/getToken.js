import { userLocalStorageKey } from '../config.js';

// Función que obtiene un token del localStorage.
export const getToken = () => {
    const authToken = localStorage.getItem(userLocalStorageKey);
    return authToken ? authToken : null;
};
