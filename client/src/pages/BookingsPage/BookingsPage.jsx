import './BookingsPage.css';
import { useEffect, useState } from 'react';
import { getBookingsService } from '../../services/fetchData';
import BookingCard from '../../components/BookingCard/BookingCard';
import useAuth from '../../hooks/useAuth';
import LateralBar from '../../components/LateralBar/LateralBar';

export default function BookingPage() {
    const [bookings, setBookings] = useState(null);
    const { authToken, authUser } = useAuth();

    useEffect(() => {
        const getBookings = async () => {
            try {
                const bookingsRequest = await getBookingsService(authToken);

                if (
                    bookingsRequest.userBookings !==
                    'El usuario no tiene ninguna reserva activa'
                )
                    setBookings(bookingsRequest.userBookings);
            } catch (error) {
                console.log(error.message);
            }
        };
        getBookings();
    }, []);

    return (
        <>
            <LateralBar />
            {/* {bookings ? (
                <h2 className="main_title">Solicitudes de Reserva</h2>
            ) : (
                <h2 className="main_title">No tienes solicitudes pendientes</h2>
            )} */}
            <h2 className="main_title">Solicitudes de Reserva</h2>
            {bookings && (
                <section className="list-bookings">
                    <div className="bookings-container">
                        <ul className="list-bookings__container">
                            {bookings.map((booking) => (
                                <li key={booking.id}>
                                    <BookingCard booking={booking} />
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            )}
            {!bookings && (
                <h2 className="booking-no-results">
                    No tienes reservas activas
                </h2>
            )}
        </>
    );
}
