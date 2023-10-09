import './ProfilePage.css';
import useAuth from '../../hooks/useAuth';
import { useEffect, useState, useRef } from 'react';
import { APIUrl } from '../../config';

// importamos funciones utilitarias que permite previsualizar y eliminar una imagen.
import { handleAddFilePreview } from '../../utils/handleAddFilePreview.js';
//REmove para terminar si da tiempo (ver fichero en utils)
import { handleRemoveFilePreview } from '../../utils/handleAddRemove.js';

export default function ProfilePage() {
    const { authUser } = useAuth();
    const [avatar, setAvatar] = useState(null);
    const [bio, setBio] = useState(null);
    const [password, setPassword] = useState(null);
    const [newAvatar, setNewAvatar] = useState(null); // Almacena el nuevo avatar seleccionado

    const [file, setFile] = useState(null); // Almacena el archivo de imagen seleccionado
    const [previewUrl, setPreviewUrl] = useState(''); // Almacena la url de la previsualización de la imagen
    const [loading, setLoading] = useState(false); // indica si el formulario se esta procesando enviando datos

    const fileInputRef = useRef(null);

    useEffect(() => {
        setAvatar(authUser?.avatar);
        setBio(authUser?.bio);
        setPassword(authUser?.password);
    }, [authUser]);

    useEffect(() => {
        console.log(avatar);
    }, [newAvatar]);

    const onChangeImg = (e) => {
        setNewAvatar(e.target.value);
        handleAddFilePreview(e, setFile, setPreviewUrl);
    };

    console.log('QUE PUTAS LLEGA AQUI', authUser);
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
                            value={authUser?.username}
                            disabled
                        />
                    </div>
                    <div className="profile-body-mail-container">
                        <h4 className="profile-body-mail-title">Email</h4>
                        <input
                            type="text"
                            className="input-profile"
                            value={authUser?.email}
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
