// importamos los hooks necesarios

import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useError } from '../../hooks/useError.js';

// Importamos los servicios para crear productos
import { addProductService } from '../../services/fetchData.js';

// importamos funciones utilitarias que permite previsualizar y eliminar una imagen.
import { handleAddFilePreview } from '../../utils/handleAddFilePreview.js';
//REmove para terminar si da tiempo (ver fichero en utils)
import { handleRemoveFilePreview } from '../../utils/handleAddRemove.js';
import useAuth from '../../hooks/useAuth.js';
import { toast } from 'react-toastify';

// Definición del componente ProductCreateForm.
const ProductCreateForm = () => {
    const { authToken } = useAuth();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    // Obtención de la función setErrMsg del hook useError.
    // const { setErrMsg } = useError();

    // Utilización de useState para definir varios estados del componente

    const [productName, setProductName] = useState('');
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
    const handleProductCreate = async (e) => {
        e.preventDefault();
        console.log('entra en handleProductCreate', e.target);
        try {
            setLoading(true);

            // Creamos un objeto FormData y establecemos sus propiedades. Adjuntamos los estados al formData
            // con append agregamos un nuevo campo y su valor al objeto fromData
            const formData = new FormData();

            formData.append('productName', productName);
            formData.append('description', description);
            formData.append('category', category);
            formData.append('state', state);
            formData.append('place', place);
            formData.append('price', price);

            // Si existe una imagen la asignamos también.
            if (file) formData.append('image', file);

            // Creamos un producto en la base de datos medianto un servicio.
            const body = await addProductService(authToken, formData);

            //si el servicio devuelve un estado de error se lanza una excepción
            if (body.status === 'error') {
                throw new Error(body.message);
            }

            // En caso de exito redirigimos a la página principal.
            navigate('/');
            toast.success('Producto creado correctamente');
        } catch (err) {
            if (err.message === 'El valor de "price" debe ser un número') {
                toast.error('Tienes que introducir un precio');
            }
            if (err.message === 'El campo "place" no debe estar vacío') {
                toast.error('Debes introducir una localidad');
            }
            if (err.message === 'El campo "image" es requerido') {
                toast.error('Tienes que adjuntar una imagen del producto');
            }
            // toast.error(err.message);
            // Captura y manejo de errores mediante el hook useError.
            //   setErrMsg(err.message);
        } finally {
            setLoading(false);
        }
    };
    // Renderizado del formulario y elementos de la interfaz del usuario
    return (
        <form className="product-create-form" onSubmit={handleProductCreate}>
            <textarea
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                maxLength="280"
                autoFocus
                required
                placeholder="Nombre del Producto"
            />

            <div className="select-container">
                <label htmlFor="category-select">Categoría:</label>
                <select
                    id="category-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                >
                    <option value="" defaultValue>
                        Selecciona una categoría
                    </option>
                    <option value="Audio">Audio</option>
                    <option value="Cámaras de fotos">Cámaras de fotos</option>
                    <option value="Consolas">Consolas</option>
                    <option value="Juguetes">Juguetes</option>
                    <option value="Máquinas de escribir">
                        Máquinas de escribir
                    </option>
                    <option value="Ordenadores">Ordenadores</option>
                    <option value="Relojes">Relojes</option>
                    <option value="Teléfonos">Teléfonos</option>
                    <option value="Televisores">Televisores</option>
                    <option value="Video">Video</option>
                    <option value="Otros">Otros</option>
                </select>
            </div>
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength="280"
                autoFocus
                required
                placeholder="Descripción"
            />
            <div className="select-container">
                <label htmlFor="state-select">Estado:</label>
                <select
                    id="state-select"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                >
                    <option value="" defaultValue>
                        Selecciona estado
                    </option>
                    <option value="Nuevo">Nuevo</option>
                    <option value="Como nuevo">Como nuevo</option>
                    <option value="En buen estado">En buen estado</option>
                    <option value="En condiciones aceptables">
                        En condiciones aceptables
                    </option>
                    <option value="No funciona">No funciona</option>
                </select>
            </div>
            <input
                type="text"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                placeholder="Localidad"
            />
            <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                min="0"
                placeholder="Precio"
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
