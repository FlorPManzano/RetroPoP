import './ProductEditForm.css';

// importamos los hooks necesarios
import { useEffect, useRef, useState } from 'react';
import { useProducts } from '../../hooks/useProducts';

// importamos funciones utilitarias que permite previsualizar y eliminar una imagen.
import { handleAddFilePreview } from '../../utils/handleAddFilePreview.js';
//REmove para terminar si da tiempo (ver fichero en utils)

import { getProductByIdService } from '../../services/fetchData.js';

import { useNavigate } from 'react-router-dom';
import { APIUrl } from '../../config';
import { decimalsRegex } from '../../utils/regex.js';

import PropTypes from 'prop-types';

// Definición del componente ProductCreateForm.
const ProductEditForm = ({ id }) => {
    const fileInputRef = useRef(null);

    // Importa la función addProduct del hook useProducts
    const { editProduct } = useProducts();

    // Utilización de useState para definir varios estados del componente

    const [img, setImg] = useState(null);
    const [imgTemp, setImgTemp] = useState(null);
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState(''); // almacena el contenido
    const [category, setCategory] = useState('');
    const [state, setState] = useState('');
    const [place, setPlace] = useState('');
    const [price, setPrice] = useState('');
    const [file, setFile] = useState(null); // Almacena el archivo de imagen seleccionado
    const [previewUrl, setPreviewUrl] = useState(''); // Almacena la url de la previsualización de la imagen
    const [loading, setLoading] = useState(false); // indica si el formulario se esta procesando enviando datos

    const navigate = useNavigate();

    // Esta función se encarga de crear un producto cuando se envía el formulario.

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const body = await getProductByIdService(id);
                setProductName(body.data.productName);
                setDescription(body.data.description);
                setCategory(body.data.category);
                setState(body.data.state);
                setPlace(body.data.place);
                setPrice(body.data.price);
                setImgTemp(body.data.image);
                setLoading(false);
                console.log('esto es el bodyyyyy', body);
            } catch (err) {
                console.log(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const onChangeImg = (e) => {
        setImg(e.target.value);
        handleAddFilePreview(e, setFile, setPreviewUrl);
    };

    const handleCancelSubmit = (e) => {
        e.preventDefault();
        navigate(`/product/${id}`);
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
        formData.append('originalImg', imgTemp);
        formData.append('productId', id);

        // Si existe una imagen la asignamos también.
        if (file) formData.append('image', file);
        navigate(`/`);

        editProduct(formData, id);
    };
    // Renderizado del formulario y elementos de la interfaz del usuario
    return (
        <div className="product-create-form-container">
            <form
                className="product-create-form"
                onSubmit={handleProductCreate}
            >
                <header className="title-upload-product">
                    <h2 className="title-upload">Edita tu producto</h2>
                </header>
                <div className="body-form-main">
                    <section className="product-create-form__left">
                        <h4 className="product-create-form__title">
                            Nombre del producto
                        </h4>
                        <h4 className="product-create-form__title">
                            Categoría
                        </h4>
                        <h4 className="product-create-form__title">Estado</h4>
                        <h4 className="product-create-form__title">
                            Localidad
                        </h4>
                        <h4 className="product-create-form__title">Precio</h4>
                    </section>
                    <main className="product-create-form__main">
                        <input
                            className="input-place-upload"
                            type="text"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            maxLength="150"
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
                        <input
                            className="input-place-upload"
                            type="text"
                            value={place}
                            maxLength="30"
                            onChange={(e) => setPlace(e.target.value)}
                            placeholder="Localidad"
                            required
                        />
                        <input
                            type="number"
                            step="0.01"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            min="0"
                            placeholder="Precio"
                            required
                        />
                    </main>
                </div>

                <section className="product-create-form__section_description">
                    <textarea
                        className="product-create-form__description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        maxLength="200"
                        autoFocus
                        required
                        placeholder="Descripción"
                    />
                </section>
                <div className="img-prev-container">
                    <img
                        src={`${APIUrl}/images/${imgTemp}`}
                        className="imgTemp"
                    />
                    <img src="/icons/arrow-right.png" className="row" />
                    {previewUrl && (
                        <img
                            className="img-product"
                            src={previewUrl}
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
                        className="clear-fields btn-product-upload"
                        onClick={handleCancelSubmit}
                    >
                        Cancelar
                    </button>
                    <button
                        className="submit-btn btn-product-upload"
                        disabled={loading}
                    >
                        Enviar
                    </button>
                </footer>
            </form>
        </div>
    );
};

// Exportación del componente ProductCreateForm
export default ProductEditForm;

// Props validation

ProductEditForm.propTypes = {
    id: PropTypes.number,
};
