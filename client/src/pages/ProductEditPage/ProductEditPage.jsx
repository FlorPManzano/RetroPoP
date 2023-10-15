import ProductEditForm from '../../forms/ProductEditForm/ProductEditForm';
import { useLocation } from 'react-router-dom';

export default function ProductEditPage() {
    const id = useLocation().pathname.split('/')[3];

    return <ProductEditForm id={id} />;
}
