import './ReviewCard.css';
import { productPropTypes } from '../../utils/customPropTypes.js';
import { APIUrl } from '../../config';
import StarsReview from '../StarsReview/StarsReview';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useHref } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { newReviewService } from '../../services/fetchData';
import useAuth from '../../hooks/useAuth';

export default function ReviewCard({ image, productName, resno }) {
    const [stars, setStars] = useState(null);

    const { authToken } = useAuth();

    // const handleStars = (e) => {
    //     e.preventDefault();
    //     const btn = document.querySelector('.valoracion');
    //     const num = e.target.getAttribute('value');
    //     btn.console.log(e.target.getAttribute('value'));
    //     setStars(e.target.getAttribute('value'));
    // };

    const navigate = useNavigate();

    const handleSubmitReview = async (e) => {
        try {
            e.preventDefault();
            if (e.target[0].value === '') {
                return toast.error('Debes escribir un título para la reseña');
            }
            if (e.target[1].value === '') {
                return toast.error('Debes escribir un comentario');
            }
            if (e.target[2].value === '') {
                return toast.error('Debes seleccionar una  puntuación');
            }
            const titleRw = e.target[0].value;
            const textRw = e.target[1].value;
            const starsRw = e.target[2].value;
            const review = await newReviewService(
                titleRw,
                textRw,
                starsRw,
                resno,
                authToken
            );
            toast.success('Reseña publicada');
            navigate(`/`);
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="review-card-container">
            <article className="review-card">
                <section className="review-card__image-container">
                    <img
                        className="review-card__image"
                        src={`${APIUrl}/images/${image}`}
                        alt="review"
                    />
                </section>
                <section className="review-card__info">
                    <form
                        className="review-card__form"
                        onSubmit={handleSubmitReview}
                    >
                        <h3 className="review-card__name">{productName}</h3>
                        <input
                            type="text"
                            className="review-title"
                            placeholder="Titulo de la reseña"
                        />

                        <textarea
                            className="review-text"
                            placeholder="Escribe tu reseña"
                        />
                        {/* <div className="valoracion">
                        <button>
                            <i
                                className="fas fa-star"
                                value="5"
                                // onClick={handleStars}
                            ></i>
                        </button>

                        <button>
                            <i
                                className="fas fa-star"
                                value="4"
                                // onClick={handleStars}
                            ></i>
                        </button>

                        <button>
                            <i
                                className="fas fa-star"
                                value="3"
                                // onClick={handleStars}
                            ></i>
                        </button>

                        <button>
                            <i
                                className="fas fa-star"
                                value="2"
                                // onClick={handleStars}
                            ></i>
                        </button>

                        <button>
                            <i
                                className="fas fa-star"
                                value="1"
                                // onClick={handleStars}
                            ></i>
                        </button>
                    </div> */}
                        <select
                            className="stars-select"
                            name="stars"
                            id="stars"
                        >
                            <option value="">Valoración</option>
                            <option value="1">★</option>
                            <option value="2">★★</option>
                            <option value="3">★★★</option>
                            <option value="4">★★★★</option>
                            <option value="5">★★★★★</option>
                        </select>
                        <button
                            className="review-card__button"
                            // onClick={handleStars}
                        >
                            Publicar
                        </button>
                    </form>
                </section>
            </article>
        </div>
    );
}

ReviewCard.PropTypes = {
    product: productPropTypes,
};
