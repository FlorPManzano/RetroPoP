import LateralBar from '../../components/LateralBar/LateralBar';
import ProductCard from '../../components/ProductCard/ProductCard';
import { useEffect, useState } from 'react';
import { getAllProductsService } from '../../services/fetchData';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import './ProductsActivePage.css';
import ProductCardProfile from '../../components/ProductCardProfile/ProductCardProfile';

export default function ProductsActivePage() {
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

    return (
        <section className="list-products-active">
            <LateralBar />
            <h2 className="title-active">Productos en venta</h2>
            <div className="list-products__container-active">
                <ul className="list-products__list-active">
                    {products &&
                        products
                            .filter(
                                (product) =>
                                    product.isSelled === 0 &&
                                    product.userId === authUser?.id
                            )
                            .map((product) => (
                                <li
                                    key={product.id}
                                    onClick={(event) =>
                                        handleCardClick(event, product.id)
                                    }
                                >
                                    <ProductCardProfile
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
