import { useState } from 'react';
import './BookingForm.css';

export default function BookingForm() {
    const [deliveryPlace, setDeliveryPlace] = useState('');
    const [deliveryTime, setDeliveryTime] = useState('');

    const bookingSubmit = (e) => {
        e.preventDefault();
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
