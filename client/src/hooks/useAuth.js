// Importamos los hooks.
import { useContext } from 'react';

// Importamos el contexto.
import { AuthContext } from '../contexts/AuthContext.jsx';

const useAuth = () => {
    return useContext(AuthContext);
};

export default useAuth;
