import './ProductCreateForm.css';

// importamos los hooks necesarios
import { useRef, useState } from 'react';
import { useProducts } from '../../hooks/useProducts';

// importamos funciones utilitarias que permite previsualizar y eliminar una imagen.
import { handleAddFilePreview } from '../../utils/handleAddFilePreview.js';
//REmove para terminar si da tiempo (ver fichero en utils)
import { handleRemoveFilePreview } from '../../utils/handleAddRemove.js';

// Definición del componente ProductCreateForm.
const ProductCreateForm = () => {
    const fileInputRef = useRef(null);

    // Importa la función addProduct del hook useProducts
    const { addProduct } = useProducts();

    // Utilización de useState para definir varios estados del componente

    const [img, setImg] = useState(null); // almacena la imagen
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

    const onChangeImg = (e) => {
        setImg(e.target.value);
        handleAddFilePreview(e, setFile, setPreviewUrl);
    };

    const handleClearFields = (e) => {
        e.preventDefault();
        setProductName('');
        setDescription('');
        setCategory('');
        setState('');
        setPlace('');
        setPrice('');
        setFile(null);
        setPreviewUrl('');
        setImg(null);
    };

    const handleProductCreate = async (e) => {
        e.preventDefault();
        // try {
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

        addProduct(formData);
    };
    // Renderizado del formulario y elementos de la interfaz del usuario
    return (
        <div className="product-create-form-container">
            <form
                className="product-create-form"
                onSubmit={handleProductCreate}
            >
                <section className="title-upload-product">
                    <h2 className="title-upload">Sube tu producto</h2>
                </section>
                <header className="product-create-form__header">
                    <input
                        className="input-place-upload"
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        maxLength="280"
                        autoFocus
                        required
                        placeholder="Nombre del Producto"
                    />

                    <div className="select-container">
                        {/* <label htmlFor="category-select">Categoría:</label> */}
                        <select
                            className="select-category"
                            id="category-select"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                        >
                            <option value="" defaultValue>
                                Selecciona una categoría
                            </option>
                            <option value="Audio">Audio</option>
                            <option value="Cámaras de fotos">
                                Cámaras de fotos
                            </option>
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
                </header>

                <section className="product-create-form__body">
                    <div className="select-container">
                        {/* <label htmlFor="state-select">Estado:</label> */}
                        <select
                            className="select-category"
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
                            <option value="En buen estado">
                                En buen estado
                            </option>
                            <option value="En condiciones aceptables">
                                En condiciones aceptables
                            </option>
                            <option value="No funciona">No funciona</option>
                        </select>
                    </div>
                    <input
                        className="input-place-upload"
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
                </section>

                <section className="product-create-form__section_description">
                    <textarea
                        className="product-create-form__description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        maxLength="280"
                        autoFocus
                        required
                        placeholder="Descripción"
                    />
                </section>
                <div className="img-prev-container">
                    {previewUrl && (
                        <img
                            className="img-product"
                            src={previewUrl}
                            // onClick={() => {
                            //     handleRemoveFilePreview(
                            //         fileInputRef,
                            //         setFile,
                            //         setPreviewUrl
                            //     );
                            // }}
                            alt="Previsualización"
                            title="Eliminar imagen"
                        />
                    )}
                    {!img ? (
                        <div className="conditional-img">
                            <label
                                htmlFor="file-input"
                                className="custom-file-label"
                            >
                                <span className="span-img">
                                    <img
                                        src="/icons/folder.png"
                                        alt="upload"
                                        width="150"
                                        style={{ cursor: 'pointer' }}
                                    />
                                </span>
                                <span className="span-text-img">
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
                    ) : null}
                </div>
                <footer className="product-create-form__footer">
                    <button
                        className="clear-fields"
                        onClick={handleClearFields}
                    >
                        Borrar
                    </button>
                    <button className="submit-btn" disabled={loading}>
                        Enviar
                    </button>
                </footer>
            </form>
        </div>
    );
};

// Exportación del componente ProductCreateForm
export default ProductCreateForm;
