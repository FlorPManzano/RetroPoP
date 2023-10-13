import './ListProducts.css';
import { useState, useEffect } from 'react';

import { getAllProductsService } from '../../services/fetchData.js';
import ProductCard from '../ProductCard/ProductCard';
import { productPropTypes } from '../../utils/customPropTypes';
import { useNavigate } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';

export default function ListProducts() {
    const { authUser, authFavs } = useAuth();

    const [products, setProducts] = useState([]);
    const [favs, setFavs] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const body = await getAllProductsService();
                setProducts(body.data);
                setFavs(authFavs);
            } catch (err) {
                console.log(err.message);
            }
        };
        fetchProducts();
    }, [favs, authFavs]);

    const handleCardClick = async (e, key) => {
        e.preventDefault();
        navigate(`/product/${key}`);
    };

    return (
        <section className="list-products">
            <div className="list-products__container">
                <ul className="list-products__list">
                    {products &&
                        products
                            .filter(
                                (product) =>
                                    product.isSelled === 0 &&
                                    product.userId !== authUser?.id
                            )
                            .map((product) => (
                                <li
                                    key={product.id}
                                    onClick={(event) =>
                                        handleCardClick(event, product.id)
                                    }
                                >
                                    <ProductCard
                                        productName={product.productName}
                                        price={product.price}
                                        image={product.image}
                                        fav={
                                            authFavs?.includes(product.id)
                                                ? true
                                                : false
                                        }
                                    />
                                </li>
                            ))}
                </ul>
            </div>
        </section>
    );
}

ListProducts.PropTypes = {
    product: productPropTypes,
};
