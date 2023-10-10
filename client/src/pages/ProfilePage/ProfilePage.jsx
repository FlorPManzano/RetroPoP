import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth.js'; // Importa el hook personalizado de autenticación.
import { editUserService } from '../../services/fetchData.js'; // Importa el servicio para editar datos de usuario.
import './ProfilePage.css'; // Importa los estilos de la página.
import { APIUrl } from '../../config.js'; // Importa la URL de la API.

export default function ProfilePage() {
    // Obtiene datos de usuario y función para actualizar el perfil desde el hook de autenticación.
    const { authToken, authUser, authUpdateProfile } = useAuth();

    console.log('HOLAAAA', authUser);
    // Configura estados iniciales para username, email, bio y avatar con datos del usuario.
    const [username, setUsername] = useState(authUser?.username);
    const [email, setEmail] = useState(authUser?.email);
    const [bio, setBio] = useState(authUser?.bio || ''); // Si no hay bio, establece una cadena vacía.
    const [avatar, setAvatar] = useState(null); // Inicializa el avatar como nulo.

    // Efecto para actualizar estados cuando cambia el usuario.
    useEffect(() => {
        setUsername(authUser?.username);
        setEmail(authUser?.email);
        setBio(authUser?.bio || '');
        setAvatar(authUser?.avatar);
    }, []);

    console.log(username, email, bio, avatar);

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
            await editUserService(formData);

            // Llama a la función para actualizar el perfil de autenticación del usuario.
            await authUpdateProfile({ username, email, bio });
            toast.success('Perfil actualizado con éxito');
        } catch (error) {
            toast.error('Error al actualizar el perfil');
        }
    };

    // const handleAvatarChange = (e) => {
    //     const selectedFile = e.target.files[0];

    //     if (selectedFile) {
    //         setAvatar(selectedFile);
    //     }
    // };

    /* // Función para mostrar el perfil actual del usuario.
    const showUserProfile = () => {
        return (
            <div className="profile-info">
                <h2>Perfil Actual</h2>
                <p>
                    <strong>Username:</strong> {user.username}
                </p>
                <p>
                    <strong>Email:</strong> {user.email}
                </p>
                <p>
                    <strong>Bio:</strong>{' '}
                    {user.bio || 'No tiene una biografía.'}
                </p>
                <img src={user.avatarUrl} alt="Avatar" />
            </div>
        );
    };*/

    return (
        <div className="main-profile-container">
            <article className="profile-container">
                <section className="profile-header">
                    <h2 className="main-profile-title">Editar perfil</h2>
                </section>
                <section className="profile-avatar-container">
                    <h4 className="profile-avatar-title">Avatar</h4>
                    <img
                        src={
                            avatar
                                ? `${APIUrl}/avatars/${avatar}`
                                : '/icons/user-profile.png'
                        }
                        alt="avatar"
                        className="profile-avatar-img"
                    />
                    <div className="conditional-img">
                        <label
                            htmlFor="file-input"
                            className="custom-file-label"
                        >
                            <span className="profile-avatar-btn">
                                Subir imagen
                            </span>
                        </label>
                        <input
                            className="custom-file-input"
                            type="file"
                            id="file-input"
                            accept="image/*"
                            // ref={fileInputRef}
                            // onChange={onChangeImg}
                        />{' '}
                    </div>
                </section>
                <section className="profile-body-container">
                    <div className="profile-body-name-container">
                        <h4 className="profile-body-name-title">
                            Nombre de usuario
                        </h4>
                        <input
                            type="text"
                            className="input-profile"
                            value={username && username}
                            disabled
                        />
                    </div>
                    <div className="profile-body-mail-container">
                        <h4 className="profile-body-mail-title">Email</h4>
                        <input
                            type="text"
                            className="input-profile"
                            value={email}
                            disabled
                        />
                    </div>
                    <div className="profile-body-password-container">
                        <h4 className="profile-body-password-title">
                            Contraseña
                        </h4>
                        <input type="password" className="input-profile" />
                    </div>
                    <div className="profile-body-bio-container">
                        <h4 className="profile-body-bio-title">Bio</h4>
                        <textarea
                            onChange={(e) => setBio(e.target.value)}
                            value={bio && bio}
                            className="profile-body-bio-input"
                            rows="5"
                        ></textarea>
                    </div>
                </section>
                <section className="profile-footer">
                    <button className="profile-footer-btn-delete">
                        Borrar perfil
                    </button>
                    <button className="profile-footer-btn-save">
                        Guardar cambios
                    </button>
                </section>
            </article>
        </div>
    );
}
