import { useState } from 'react';
import './BookingForm.css';
import { useProducts } from '../../hooks/useProducts';
import formatDate from '../../utils/formatDate';
import { useNavigate } from 'react-router-dom';

export default function BookingForm({ resno }) {
    const [deliveryPlace, setDeliveryPlace] = useState('');
    const [deliveryTime, setDeliveryTime] = useState('');
    const { confirmBooking } = useProducts();

    const navigate = useNavigate();

    const bookingSubmit = async (e) => {
        e.preventDefault();
        const deliveryTimeFormatted = formatDate(deliveryTime);

        const result = await confirmBooking(
            resno,
            deliveryTimeFormatted,
            deliveryPlace
        );
        navigate(`/profile/bookings/`);
    };
    return (
        <div className="popup-booking">
            <h2>Datos de la entrega</h2>
            <form action="" onSubmit={bookingSubmit}>
                <input
                    type="text"
                    value={deliveryPlace}
                    onChange={(e) => setDeliveryPlace(e.target.value)}
                    maxLength="30"
                    autoFocus
                    required
                    placeholder="Lugar de entrega"
                />
                <input
                    type="datetime-local"
                    value={deliveryTime}
                    onChange={(e) => setDeliveryTime(e.target.value)}
                    required
                    placeholder="Fecha y hora de entrega"
                />
                <button type="submit">Confirmar</button>
            </form>
        </div>
    );
}
