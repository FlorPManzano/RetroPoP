import ReviewCard from '../../components/ReviewCard/ReviewCard';
import useAuth from '../../hooks/useAuth';
import { useState, useEffect } from 'react';
import { getReviewsService } from '../../services/fetchData';
import './ReviewsPage.css';

export default function ReviewsPage() {
    const { authToken } = useAuth();

    const [reviews, setReviews] = useState(null);

    useEffect(() => {
        const getReviews = async () => {
            try {
                const reviewsRequest = await getReviewsService(authToken);
                setReviews(reviewsRequest.reviews);
                console.log(reviewsRequest);
            } catch (error) {
                console.log(error.message);
            }
        };
        getReviews();
    }, []);

    return (
        <section className="list-reviews">
            <div className="review-page-container">
                <ul className="review-page-list">
                    {reviews &&
                        reviews
                            .filter((review) => review.titleRw === null)
                            .map((review) => (
                                <li key={review.id}>
                                    <ReviewCard
                                        image={review.image}
                                        productName={review.productName}
                                        resno={review.resno}
                                    />
                                </li>
                            ))}
                </ul>
                {!reviews && (
                    <p className="reviews-no-pendings">
                        No tienes reseñas pendientes
                    </p>
                )}
            </div>
        </section>
    );
}
