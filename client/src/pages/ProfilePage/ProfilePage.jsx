import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth.js'; // Importa el hook personalizado de autenticación.
import { editUserService } from '../../services/fetchData.js'; // Importa el servicio para editar datos de usuario.
import './ProfilePage.css'; // Importa los estilos de la página.
//import { APIUrl } from '../../config.js'; // Importa la URL de la API.
import { Navigate } from 'react-router-dom';

export default function ProfilePage() {
    // Obtiene datos de usuario y función para actualizar el perfil desde el hook de autenticación.
    const { authUser, authUpdateProfile, authThoken } = useAuth();

    console.log('HOLAAAA', authUser);
    // Configura estados iniciales para username, email, bio y avatar con datos del usuario.
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState(''); // Si no hay bio, establece una cadena vacía.
    const [avatar, setAvatar] = useState(null); // Inicializa el avatar como nulo.

    // Efecto para actualizar estados cuando cambia el usuario.
    useEffect(() => {
        if (authUser) {
            setUsername(authUser.username);
            setEmail(authUser.email);
            setBio(authUser.bio || '');
            setAvatar(null);
        }
    }, [authUser]);

    // Si el usuario no está logeado redirigimos a la página principal.
    if (!authUser) return <Navigate to="/" />;

    // Función para actualizar el perfil del usuario.
    const handleUpdateProfile = async (e) => {
        e.preventDefault();

        // Validación de campos obligatorios.
        if (!username.trim() || !email.trim()) {
            return toast.error(
                'Por favor, completa todos los campos obligatorios.'
            );
        }

        // Creación de un objeto FormData para enviar los datos del formulario.
        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('bio', bio);

        // Si se proporciona un nuevo avatar, lo adjunta al formulario.
        if (avatar) {
            formData.append('avatar', avatar);
        }

        try {
            // Llama al servicio para editar datos del usuario.
            await editUserService(authThoken, formData);

            // Llama a la función para actualizar el perfil de autenticación del usuario.
            await authUpdateProfile({ username, email, bio });
            toast.success('Perfil actualizado con éxito');
        } catch (error) {
            toast.error('Error al actualizar el perfil');
        }
    };

    return (
        authUser && (
            <>
                {/* Renderiza el perfil actual del usuario. */}
                <div className="profile-container">
                    <h2>Editar Perfil</h2>
                    <form onSubmit={handleUpdateProfile}>
                        <div className="form-group">
                            <label>Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Bio</label>
                            <textarea
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Avatar</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setAvatar(e.target.files[0])}
                            />
                        </div>
                        <button type="submit">Actualizar Perfil</button>
                    </form>
                </div>
            </>
        )
    );
}
