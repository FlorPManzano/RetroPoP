import './ProductCardProfile.css';
import { productPropTypes } from '../../utils/customPropTypes.js';
import { APIUrl } from '../../config';

export default function ProductCardProfile({ image, productName, price }) {
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
                </footer>
            </article>
        </div>
    );
}

ProductCardProfile.PropTypes = {
    product: productPropTypes,
};
