import { APIUrl } from '../config';

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

    return body.user;
};

// Editar un perfil privado de un usuario
const editUserService = async (token, editUserForm) => {
    const res = await fetch(`${APIUrl}/users/edit`, {
        method: 'PUT',
        headers: {
            Authorization: token,
        },
        body: editUserForm,
    });

    const body = await res.json();

    return body;
};

const getAllProductsService = async () => {
    const res = await fetch(`${APIUrl}/products`);

    const body = await res.json();

    return body;
};

const getSearchProductsService = async (params) => {
    const res = await fetch(`${APIUrl}/products/filters/${params}`);

    const body = await res.json();

    return body;
};

const getProductByIdService = async (productId) => {
    const res = await fetch(`${APIUrl}/products/${productId}`);
    const body = await res.json();

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

    return body;
};

const getBookingsService = async (token) => {
    const res = await fetch(`${APIUrl}/users/requests`, {
        headers: {
            Authorization: token,
        },
    });

    const body = await res.json();

    return body;
};

const addBookingsService = async (token, idProduct) => {
    const res = await fetch(`${APIUrl}/bookings`, {
        method: 'POST',
        headers: {
            Authorization: token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idProduct }),
    });

    const body = await res.json();

    return body;
};

const confirmBookingService = async (
    token,
    resno,
    deliveryTime,
    deliveryPlace
) => {
    const confirm = true;
    const res = await fetch(`${APIUrl}/bookings/confirm/${resno}`, {
        method: 'PUT',
        headers: {
            Authorization: token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ confirm, deliveryTime, deliveryPlace }),
    });

    const body = await res.json();

    return body;
};

const cancelBookingService = async (token, resno) => {
    const confirm = false;
    const deliveryTime = '';
    const deliveryPlace = '';
    const res = await fetch(`${APIUrl}/bookings/confirm/${resno}`, {
        method: 'PUT',
        headers: {
            Authorization: token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ confirm, deliveryTime, deliveryPlace }),
    });
    const body = await res.json();

    return body;
};

const getReviewsService = async (token) => {
    const res = await fetch(`${APIUrl}/reviews`, {
        headers: {
            Authorization: token,
        },
    });

    const body = await res.json();

    return body;
};

const newReviewService = async (titleRw, textRw, starsRw, resno, token) => {
    const res = await fetch(`${APIUrl}/reviews/${resno}`, {
        method: 'POST',
        headers: {
            Authorization: token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ titleRw, textRw, starsRw }),
    });

    const body = await res.json();

    return body;
};

const deleteUserService = async (token) => {
    const res = await fetch(`${APIUrl}/users/delete`, {
        method: 'DELETE',
        headers: {
            Authorization: token,
        },
    });

    const body = await res.json();

    return body;
};

const setFavoriteService = async (token, idProduct) => {
    const res = await fetch(`${APIUrl}/favorites`, {
        method: 'PUT',
        headers: {
            Authorization: token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idProduct }),
    });

    const body = await res.json();

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
    getBookingsService,
    addBookingsService,
    confirmBookingService,
    cancelBookingService,
    getReviewsService,
    newReviewService,
    deleteUserService,
    setFavoriteService,
};
