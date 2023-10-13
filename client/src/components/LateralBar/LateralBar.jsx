import './LateralBar.css';
import { NavLink } from 'react-router-dom';

export default function LateralBar() {
    return (
        <div className="lateral-bar">
            <aside className="lateral-bar__aside">
                <ul className="lateral-bar__list">
                    <NavLink to="/profile" className="navlink-profile">
                        <li className="lateral-bar__list__item">
                            Editar Perfil
                        </li>
                    </NavLink>
                    <NavLink to="/profile/products" className="navlink-profile">
                        <li className="lateral-bar__list__item">
                            Productos en venta
                        </li>
                    </NavLink>
                    <NavLink to="/profile/sold" className="navlink-profile">
                        <li className="lateral-bar__list__item">
                            Productos vendidos
                        </li>
                    </NavLink>
                    <NavLink to="/profile/favs" className="navlink-profile">
                        <li className="lateral-bar__list__item">Favoritos</li>
                    </NavLink>
                    <NavLink to="/profile/bookings" className="navlink-profile">
                        <li className="lateral-bar__list__item">Solicitudes</li>
                    </NavLink>
                    <NavLink to="/profile/reviews" className="navlink-profile">
                        <li className="lateral-bar__list__item">
                            Valoraciones pendientes
                        </li>
                    </NavLink>
                </ul>
            </aside>
        </div>
    );
}
