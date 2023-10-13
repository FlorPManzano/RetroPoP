import { useEffect, useState } from 'react';
import './ProductPage.css';
import { useParams } from 'react-router-dom';
import { getProductByIdService } from '../../services/fetchData';
import ProductBigCard from '../../components/ProductBigCard/ProductBigCard';

export default function ProductPage() {
    const [product, setProduct] = useState(null);

    const { id } = useParams();

    useEffect(() => {
        const getProduct = async () => {
            try {
                const product = await getProductByIdService(id);

                setProduct(product.data);
            } catch (error) {
                console.log(error.message);
            }
        };
        getProduct();
    }, [id]);

    return product && <ProductBigCard product={product} />;
}
