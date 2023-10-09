import './ListProducts.css';
import { useState, useEffect } from 'react';

import { getAllProductsService } from '../../services/fetchData.js';
import ProductCard from '../ProductCard/ProductCard';
import { productPropTypes } from '../../utils/customPropTypes';
import { useNavigate } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';

export default function ListProducts() {
    const { authUser } = useAuth();

    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // setLoading(true);
                const body = await getAllProductsService();
                setProducts(body.data);
            } catch (err) {
                console.log(err.message);
            } finally {
                // setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleCardClick = async (e, key) => {
        e.preventDefault();
        navigate(`/product/${key}`);
    };

    // console.log('WEEEEEEE', products);
    return (
        <section className="list-products">
            <div className="list-products__container">
                <ul className="list-products__list">
                    {products &&
                        products
                            .filter(
                                (product) =>
                                    product.isSelled === 0 &&
                                    product.userId !== authUser.id
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

// <main>
//     <ul>
//         {products &&
//             products.map((product) => (
//                 <li key={product.id}>
//                     {product.productName} {product.price}
//                     <img
//                         src={`http://localhost:3000/images/${product.image}`}
//                         width={100}
//                         height={100}
//                         alt={product.productName}
//                     />
//                 </li>
//             ))}
//     </ul>
// </main>;
