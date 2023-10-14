import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import {
    addBookingsService,
    addProductService,
    getAllProductsService,
    confirmBookingService,
    cancelBookingService,
    editProductService,
} from '../services/fetchData';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';

export const useProducts = () => {
    const toastError = (errMsg) => toast.error(errMsg);
    const toastSuccess = (msg) => toast.success(msg);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { authToken } = useAuth();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const body = await getAllProductsService();
                setProducts(body.data.products);
            } catch (err) {
                toast.error(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    // Función que agrega un producto en el State.

    const addProduct = async (formData) => {
        setLoading(true);
        try {
            const body = await addProductService(authToken, formData);
            if (body.status === 'error') {
                toastError(body.message);
            }

            navigate('/');
            toastSuccess('Producto creado correctamente');
        } catch (err) {
            if (err.message === 'El valor de "price" debe ser un número') {
                toast.error('Tienes que introducir un precio');
            }
            if (err.message === 'El campo "place" no debe estar vacío') {
                toast.error('Debes introducir una localidad');
            }
            if (err.message === 'El campo "image" es requerido') {
                toast.error('Tienes que adjuntar una imagen del producto');
            }
            err.message === 'Failed to fetch'
                ? toastError('Error de conexión')
                : toastError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Función que agrega una reserva
    const addBooking = async (productId) => {
        setLoading(true);

        try {
            const body = await addBookingsService(authToken, productId);

            if (body.status === 'error') {
                toastError(body.message);
                navigate('/');
            } else {
                navigate('/');
                toastSuccess('Has realizado la reserva correctamente');
            }
        } catch (err) {
            err.message === 'Failed to fetch'
                ? toastError('Error de conexión')
                : toastError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Función que acepta una reserva
    const confirmBooking = async (resno, deliveryTime, deliveryPlace) => {
        setLoading(true);

        try {
            const body = await confirmBookingService(
                authToken,
                resno,
                deliveryTime,
                deliveryPlace
            );

            if (body.status === 'error') {
                toastError(body.message);
                navigate('/profile/bookings');
            } else {
                navigate('/profile/bookings');
                toastSuccess('Has confirmado la reserva correctamente');
            }
        } catch (err) {
            err.message === 'Failed to fetch'
                ? toastError('Error de conexión')
                : toastError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Función que rechaza una reserva
    const cancelBooking = async (resno) => {
        setLoading(true);

        try {
            const body = await cancelBookingService(authToken, resno);

            if (body.status === 'error') {
                toastError(body.message);
                navigate('/profile/bookings');
            } else {
                navigate('/profile/bookings');
                toastSuccess('Has rechazado la reserva correctamente');
            }
        } catch (err) {
            err.message === 'Failed to fetch'
                ? toastError('Error de conexión')
                : toastError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const editProduct = async (formData, id) => {
        setLoading(true);
        try {
            const body = await editProductService(authToken, formData, id);
            if (body.status === 'error') {
                toastError(body.message);
            }

            navigate('/');
            toastSuccess('Producto editado correctamente');
        } catch (err) {
            if (err.message === 'El valor de "price" debe ser un número') {
                toast.error('Tienes que introducir un precio');
            }
            if (err.message === 'El campo "place" no debe estar vacío') {
                toast.error('Debes introducir una localidad');
            }
            if (err.message === 'El campo "image" es requerido') {
                toast.error('Tienes que adjuntar una imagen del producto');
            }
            err.message === 'Failed to fetch'
                ? toastError('Error de conexión')
                : toastError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return {
        products,
        loading,
        addProduct,
        addBooking,
        confirmBooking,
        cancelBooking,
        editProduct,
    };
};
