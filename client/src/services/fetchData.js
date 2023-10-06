import { APIUrl } from '../config';

// export default async function fetchData(route, method, body) {
//     const res = await fetch(`${APIUrl}/${route}`, {
//         method: method,
//         headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(body),
//     });
//     const json = await res.json();

//     return json;
// }

// Registro del usuario
const registerUserService = async (username, email, password) => {
    const res = await fetch(`${APIUrl}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
    });

    const body = await res.json();

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
const loginUserService = async (email, password) => {
    const res = await fetch(`${APIUrl}/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    const body = await res.json();

    // if (!res.ok) {
    //     throw new Error(body.error);
    // }

    return body;
};

// Ver perfil privado de un usuario
const getUserProfileService = async (token) => {
    const res = await fetch(`${APIUrl}/users/profile`, {
        headers: {
            Authorization: token,
        },
    });

    const body = await res.json();

    if (!res.ok) {
        throw new Error(body.error);
    }

    return body.data.data;
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

const getProductByIdService = async (productId) => {
    const res = await fetch(`${APIUrl}/products/${productId}`);
    const body = await res.json();

    if (!res.ok) {
        throw new Error(body.error);
    }

    return body;
};

const addProductService = async (token, formData) => {
    const res = await fetch(`${APIUrl}/products`, {
        method: 'post',
        headers: {
            Authorization: token,
        },
        body: formData,
    });

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
    getProductByIdService,
    addProductService,
};
