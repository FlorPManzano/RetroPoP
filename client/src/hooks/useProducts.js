import { useEffect, useState } from 'react';
import { useError } from './useError';

import { getAllProductsService } from '../services/fetchData';

export const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const { setErrMsg } = useError();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const body = await getAllProductsService();
                setProducts(body.data.products);
            } catch (err) {
                setErrMsg(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [setErrMsg]);

    // Función que agrega un producto en el State.

    // Función que edita un producto en el State.

    // Función que agrega un like a un producto en el State.

    return { products, loading };
};
