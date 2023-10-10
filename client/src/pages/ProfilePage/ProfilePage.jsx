import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth.js'; // Importa el hook personalizado de autenticación.
import { editUserService } from '../../services/fetchData.js'; // Importa el servicio para editar datos de usuario.
import './ProfilePage.css'; // Importa los estilos de la página.
import { APIUrl } from '../../config.js'; // Importa la URL de la API.
import { Navigate } from 'react-router-dom';
import { handleAddFilePreview } from '../../utils/handleAddFilePreview.js';

export default function ProfilePage() {
    const fileInputRef = useRef(null);
    // Obtiene datos de usuario y función para actualizar el perfil desde el hook de autenticación.
    const { authUser, authUpdateProfile, authToken } = useAuth();
    // Configura estados iniciales para username, email, bio y avatar con datos del usuario.
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState(''); // Si no hay bio, establece una cadena vacía.
    const [avatar, setAvatar] = useState(null); // Inicializa el avatar como nulo.
    const [img, setImg] = useState(null);

    const [file, setFile] = useState(null); // Almacena el archivo de imagen seleccionado
    const [previewUrl, setPreviewUrl] = useState(''); // Almacena la url de la previsualiza

    // Efecto para actualizar estados cuando cambia el usuario.
    useEffect(() => {
        if (authUser) {
            setUsername(authUser.username);
            setEmail(authUser.email);
            setBio(authUser.bio || '');
            authUser.avatar
                ? setAvatar(`${APIUrl}/avatars/${authUser.avatar}`)
                : setAvatar('/icons/user-profile.png');
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
        formData.append('bio', bio);

        // Si se proporciona un nuevo avatar, lo adjunta al formulario.
        if (avatar) {
            formData.append('avatar', avatar);
        }

        try {
            // Llama al servicio para editar datos del usuario.
            // await editUserService(authToken, formData);

            // Llama a la función para actualizar el perfil de autenticación del usuario.
            console.log('Esto entra');
            await authUpdateProfile(formData);
        } catch (error) {
            toast.error('Error al actualizar el perfil 1');
        }
    };

    const onChangeImg = (e) => {
        setImg(e.target.value);
        handleAddFilePreview(e, setAvatar, setPreviewUrl);
    };

    return (
        authUser && (
            <div className="main-profile-container">
                <form onSubmit={handleUpdateProfile}>
                    <article className="profile-container">
                        <section className="profile-header">
                            <h2 className="main-profile-title">
                                Editar perfil
                            </h2>
                        </section>
                        <section className="profile-avatar-container">
                            <h4 className="profile-avatar-title">Avatar</h4>
                            <img
                                src={previewUrl ? previewUrl : avatar}
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
                                    ref={fileInputRef}
                                    onChange={onChangeImg}
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
                                <h4 className="profile-body-mail-title">
                                    Email
                                </h4>
                                <input
                                    type="text"
                                    className="input-profile"
                                    value={email && email}
                                    disabled
                                />
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
                            <button
                                type="Submit"
                                className="profile-footer-btn-save"
                            >
                                Guardar cambios
                            </button>
                        </section>
                    </article>
                </form>
            </div>
        )
    );
}
