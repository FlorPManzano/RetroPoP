import { APIUrl } from '../config';
import { getToken } from '../utils/getToken.js';

// export default async function fetchData(route, method, data) {
//     const res = await fetch(`${APIUrl}/${route}`, {
//         method: method,
//         headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//     });
//     const json = await res.json();

//     return json;
// }

// Registro del usuario
const registerUserService = async ({ username, email, password }) => {
    const res = await fetch(`${APIUrl}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
    });

    const body = await res.json();

    if (!res.ok) {
        throw new Error(body.error);
    }
    return body;
};

// Validar un usuario
const validateUserService = async (params) => {
    const res = await fetch(`${APIUrl}/users/validate/${params}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(),
    });

    const body = await res.json();

    if (!res.ok) {
        throw new Error(body.error);
    }
    return body;
};

// Inicio de sesión
const loginUserService = async ({ email, password }) => {
    const res = await fetch(`${APIUrl}/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    const body = await res.json();
    if (!res.ok) {
        throw new Error(body.error);
    }

    return body;
};

// Ver perfil privado de un usuario
const getUserProfileService = async () => {
    const token = getToken();
    const res = await fetch(`${APIUrl}/users/profile`, {
        headers: {
            Authorization: token,
        },
    });
    const body = await res.json();

    if (!res.ok) {
        throw new Error(body.error);
    }

    return body;
};

// Editar un perfil privado de un usuario
const editUserService = async (token, editUserForm) => {
    const res = await fetch(`${APIUrl}/users/edit`, {
        method: 'PUT',
        headers: {
            token,
        },
        body: editUserForm,
    });

    const body = await res.json();

    if (!res.ok) {
        throw new Error(body.error);
    }
    return body;
};

const getAllProductsService = async () => {
    const res = await fetch(`${APIUrl}/products`);

    const body = await res.json();

    if (!res.ok) {
        throw new Error(body.error);
    }

    return body;
};

const getSearchProductsService = async (params) => {
    const res = await fetch(`${APIUrl}/products/filters/${params}`);

    const body = await res.json();

    if (!res.ok) {
        throw new Error(body.error);
    }

    return body;
};

export {
    registerUserService,
    validateUserService,
    loginUserService,
    getUserProfileService,
    editUserService,
    getAllProductsService,
    getSearchProductsService,
};
