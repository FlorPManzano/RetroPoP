import './BookingCard.css';
import { APIUrl } from '../../config';
import { bookingPropTypes } from '../../utils/customPropTypes';
import { useState } from 'react';
import BookingForm from '../../forms/BookingForm/BookingForm';
import { useProducts } from '../../hooks/useProducts';

export default function BookingCard({ booking }) {
    const [showModal, setShowModal] = useState(false);
    const { cancelBooking } = useProducts();

    const acceptBooking = (e) => {
        e.preventDefault();
        setShowModal(true);
    };
    const rejectBooking = (e) => {
        e.preventDefault();
        cancelBooking(booking.resno);
    };

    return (
        <div className="booking-container">
            <img
                src={`${APIUrl}/images/${booking.image}`}
                alt=""
                className="booking-container-img"
            />
            <div className="booking-container-info">
                <header className="booking-container-info-header">
                    <h3 className="booking-container-info-productname">
                        {booking.productName}
                    </h3>
                    <p className="booking-container-info-price">
                        {booking.price}
                    </p>
                </header>
                <main className="booking-container-info-main">
                    <p className="booking-container-info-description">
                        {booking.description}
                    </p>
                </main>
                <footer className="booking-container-info-footer">
                    <p className="booking-container-info-buyer">
                        Por {booking.userBuyer} el {booking.createdAt}
                    </p>
                    <div className="booking-container-info-buttons">
                        <button onClick={rejectBooking}>Rechazar</button>
                        <button onClick={acceptBooking}>Aceptar</button>
                        {showModal && <BookingForm resno={booking.resno} />}
                    </div>
                </footer>
            </div>
        </div>
    );
}

BookingCard.propTypes = {
    booking: bookingPropTypes,
};
