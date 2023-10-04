import './ProductBigCard.css';

export default function ProductBigCard({ product }) {
    console.log('QUE OSTIAS LLEGA AQUI', product);
    return (
        <div className="product-big-card">
            <article className="product-page">
                <header className="product-page__header">
                    <div className="product-page__header__user">
                        <div className="product-page__header__user__name">
                            <img src={product.avatar} alt="user" width="50" />
                            <h3>{product.username}</h3>
                        </div>
                        <div className="product-page__header__user__reviews">
                            <h3>Aqui van las reviews</h3>
                        </div>
                        <div className="product-page__header__user__creation">
                            <p>Fecha de creación: {product.createdAt}</p>
                        </div>
                    </div>
                </header>
                <div className="product-page__gallery">
                    <img
                        src="public/logo_retropop.png"
                        alt=""
                        className="product-image"
                    />
                </div>
                <div className="product-page__info">
                    <div className="product-page__info__name">
                        <h2>{product.productName}</h2>
                        <h3>{product.price}</h3>
                    </div>
                    <div className="product-page__info__description">
                        <p>{product.description}</p>
                    </div>
                </div>
                <footer className="product-page__footer">
                    <div className="product-page__footer__state">
                        <h3>#{product.category}</h3>
                        <h3>{product.place}</h3>
                        <h3>{product.state}</h3>
                    </div>
                    <div className="product-page__footer__buttons">
                        <button className="product-page__footer__buttons__buy">
                            Reservar
                        </button>
                        <button className="product-page__footer__buttons__fav">
                            ❤
                        </button>
                    </div>
                </footer>
            </article>
        </div>
    );
}
