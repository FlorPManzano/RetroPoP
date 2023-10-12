import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './NavBarProfile.css';

export default function NavBarProfile() {
    return (
        <nav className="navbar-profile">
            <ul className="navbar-profile__list">
                <NavLink to={`/profile`} className="navbar-profile__item">
                    <li className="navbar-profile__item">Editar Perfil</li>
                </NavLink>
                <NavLink
                    to={`/profile/active`}
                    className="navbar-profile__item"
                >
                    <li className="navbar-profile__item">Productos activos</li>
                </NavLink>
                <NavLink
                    to={`/profile/selled`}
                    className="navbar-profile__item"
                >
                    <li className="navbar-profile__item">Productos vendidos</li>
                </NavLink>
            </ul>
        </nav>
    );
}
