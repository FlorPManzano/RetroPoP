// importamos los hooks necesarios

import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useError } from '../../hooks/useError';

// Importamos los servicios para crear productos
import { addProductService } from '../services/fetchData';

// importamos funciones utilitarias que permite previsualizar y eliminar una imagen.
import { handleAddFilePreview } from '../../utils/handleAddFilePreview';
//REmove para terminar si da tiempo (ver fichero en utils)
import { handleRemoveFilePreview } from '../../utils/handleRemoveFilePreview';

// Definición del componente ProductCreateForm.
const ProductCreateForm = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    // Obtención de la función setErrMsg del hook useError.
    const { setErrMsg } = useError();

    // Utilización de useState para definir varios estados del componente

    //const productName
    const [description, setDescription] = useState(''); // almacena el contenido
    const [category, setCategory] = useState('');
    const [state, setState] = useState('');
    const [place, setPlace] = useState('');
    const [price, setPrice] = useState('');
    const [file, setFile] = useState(null); // Almacena el archivo de imagen seleccionado
    const [previewUrl, setPreviewUrl] = useState(''); // Almacena la url de la previsualización de la imagen
    const [loading, setLoading] = useState(false); // indica si el formulario se esta procesando enviando datos

    // Función que crea un producto
    // Esta función se encarga de crear un producto cuando se envía el formulario.
    const handleProductCreate = async () => {
        try {
            setLoading(true);

            // Creamos un objeto FormData y establecemos sus propiedades. Adjuntamos los estados al formData
            // con append agregamos un nuevo campo y su valor al objeto fromData
            const formData = new FormData();

            formData.append('description', description);
            formData.append('category', category);
            formData.append('state', state);
            formData.append('place', place);
            formData.append('price', price);

            // Si existe una imagen la asignamos también.
            if (file) formData.append('image', file);

            // Creamos un producto en la base de datos medianto un servicio.
            const body = await addProductService(formData);

            //si el servicio devuelve un estado de error se lanza una excepción
            if (body.status === 'error') {
                throw new Error(body.message);
            }

            // En caso de exito redirigimos a la página principal.
            navigate('/');
        } catch (err) {
            // Captura y manejo de errores mediante el hook useError.
            setErrMsg(err.message);
        } finally {
            setLoading(false);
        }
    };
    // Renderizado del formulario y elementos de la interfaz del usuario
    return (
        <form
            className="product-create-form"
            onSubmit={(e) => {
                e.preventDefault();
                handleProductCreate();
            }}
        >
            <textarea
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                maxLength="280"
                autoFocus
                required
                placeholder="Category"
            />

            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength="280"
                autoFocus
                required
                placeholder="Description"
            />

            <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="State"
            />

            <input
                type="text"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                placeholder="Place"
            />

            <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
            />

            <div className="img-prev-container">
                <button disabled={loading}>Enviar</button>

                <label htmlFor="file-input" className="custom-file-label">
                    <span>Seleccionar archivo</span>
                </label>

                <input
                    type="file"
                    id="file-input"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={(e) =>
                        handleAddFilePreview(e, setFile, setPreviewUrl)
                    }
                />

                {previewUrl && (
                    <img
                        src={previewUrl}
                        onClick={() => {
                            handleRemoveFilePreview(
                                fileInputRef,
                                setFile,
                                setPreviewUrl
                            );
                        }}
                        alt="Previsualización"
                        title="Eliminar imagen"
                    />
                )}
            </div>
        </form>
    );
};

// Exportación del componente ProductCreateForm
export default ProductCreateForm;
