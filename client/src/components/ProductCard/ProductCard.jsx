import './ProductCard.css';
import { productPropTypes } from '../../utils/customPropTypes.js';
import { APIUrl } from '../../config';
import { useState } from 'react';

import useAuth from '../../hooks/useAuth';

export default function ProductCard({ image, productName, price, fav }) {
    const { authUser } = useAuth();
    const [favorite, setFavorite] = useState(fav);

    return (
        <div className="product-card-container">
            <article className="product-card">
                <div className="product-card__image-container">
                    <img
                        className="product-card__image"
                        src={`${APIUrl}/images/${image}`}
                        alt="product"
                    />
                </div>
                <main className="product-card__main">
                    <h3 className="product-card__name">{productName}</h3>
                </main>
                <footer className="product-card__footer">
                    <p className="product-card__price">{price}€</p>
                    {authUser && (
                        <img
                            className="product-card__button"
                            alt="fav"
                            src={
                                favorite
                                    ? '/icons/heart2.png'
                                    : '/icons/heart1.png'
                            }
                        />
                    )}
                </footer>
            </article>
        </div>
    );
}

ProductCard.PropTypes = {
    product: productPropTypes,
};
