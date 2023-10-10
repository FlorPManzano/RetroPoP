import './ProductBigCard.css';
import { productPropTypes } from '../../utils/customPropTypes';
import { APIUrl } from '../../config';
import { NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useState } from 'react';
import { useProducts } from '../../hooks/useProducts.js';
import { toast } from 'react-toastify';

export default function ProductBigCard({ product }) {
    const { authToken } = useAuth();
    const [loading, setLoading] = useState(false);
    const { addBooking } = useProducts();
    const [showPopUp, setShowPopUp] = useState(false);

    const navigate = useNavigate();

    const handleBookingCreate = async (e) => {
        e.preventDefault();

        if (!authToken) {
            toast.error('Debes estar logueado para reservar un producto');
            return navigate('/login');
        }
        setShowPopUp(true);
    };

    const confirmBooking = (e) => {
        e.preventDefault();
        setLoading(true);
        addBooking(product.id);
    };

    const cancelBooking = (e) => {
        e.preventDefault();
        setShowPopUp(false);
    };

    return (
        <div className="product-big-card">
            <article className="product-page">
                <header className="product-page__header">
                    <div className="product-page__header__user">
                        <div className="product-page__header__user__name">
                            <img
                                src={`${APIUrl}/avatars/${product.avatar}`}
                                alt="user"
                                width="50"
                            />
                            <h3 className="h3-bigproduct">
                                {product.username}
                            </h3>
                        </div>
                        <div className="product-page__header__user__reviews">
                            <h3 className="h3-bigproduct">
                                {product.mediaStars} estrellas (
                                {product.totalReviews} reviews)
                            </h3>
                        </div>
                        <div className="product-page__header__user__creation">
                            <p className="p-product-created">
                                Fecha de creación: {product.createdAt}
                            </p>
                        </div>
                    </div>
                </header>
                <div className="product-page__gallery">
                    <img
                        src={`${APIUrl}/images/${product.image}`}
                        alt=""
                        className="product-image"
                    />
                </div>
                <div className="product-page__info">
                    <div className="product-page__info__name">
                        <h2 className="h3-bigproduct">{product.productName}</h2>
                        <h3 className="h3-bigproduct">{product.price}€</h3>
                    </div>
                    <div className="product-page__info__description">
                        <p className="p-product-description">
                            {product.description}
                        </p>
                    </div>
                </div>
                <footer className="product-page__footer">
                    <div className="product-page__footer__state">
                        <NavLink to={`/search/?category=${product.category}`}>
                            <h3 className="h3-footer">#{product.category}</h3>
                        </NavLink>
                        <NavLink to={`/search/?place=${product.place}`}>
                            <h3 className="h3-footer">{product.place}</h3>
                        </NavLink>
                        <NavLink to={`/search/?state=${product.state}`}>
                            <h3 className="h3-footer">{product.state}</h3>
                        </NavLink>
                    </div>
                    <div className="product-page__footer__buttons">
                        <button
                            className="product-page__footer__buttons__buy"
                            onClick={handleBookingCreate}
                        >
                            Reservar
                        </button>
                        {showPopUp && (
                            <div className="popup">
                                <p className="popup-p">
                                    ¿Estás segur@ de que quieres reservar este
                                    producto?
                                </p>
                                <button
                                    onClick={confirmBooking}
                                    className="popup-button"
                                >
                                    Confirmar
                                </button>
                                <button
                                    onClick={cancelBooking}
                                    className="popup-button"
                                >
                                    Cancelar
                                </button>
                            </div>
                        )}
                        <button className="product-page__footer__buttons__fav">
                            ❤
                        </button>
                    </div>
                </footer>
            </article>
        </div>
    );
}

ProductBigCard.propTypes = {
    product: productPropTypes,
};
