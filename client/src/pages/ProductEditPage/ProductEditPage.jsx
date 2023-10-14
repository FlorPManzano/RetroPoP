import React from 'react';
import ProductEditForm from '../../forms/ProductEditForm/ProductEditForm';
import { useNavigate, useLocation } from 'react-router-dom';

export default function ProductEditPage() {
    const id = useLocation().pathname.split('/')[3];
    const navigate = useNavigate();

    return <ProductEditForm id={id} />;
}
