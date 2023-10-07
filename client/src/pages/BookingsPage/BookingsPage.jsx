import './BookingsPage.css';
import { useEffect, useState } from 'react';
import { getBookingsService } from '../../services/fetchData';
import BookingCard from '../../components/BookingCard/BookingCard';
import useAuth from '../../hooks/useAuth';

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
                console.log(bookingsRequest.userBookings);
                console.log('fff', bookings);
            } catch (error) {
                console.log(error.message);
            }
        };
        getBookings();
    }, []);

    return (
        <>
            <h2>Solicitudes de Reserva</h2>
            {bookings && (
                <ul>
                    {bookings.map((booking) => (
                        <li key={booking.id}>
                            <BookingCard booking={booking} />
                        </li>
                    ))}
                </ul>
            )}
            {!bookings && (
                <p className="booking-no-results">No tienes reservas activas</p>
            )}
        </>
    );
}
