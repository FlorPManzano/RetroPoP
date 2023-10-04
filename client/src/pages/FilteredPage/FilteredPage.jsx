// import ListProducts from '../../components/ListProducts/ListProducts';
// import Navbar from '../../components/Navbar/Navbar';
import {
    getSearchProductsService,
    getAllProductsService,
} from '../../services/fetchData';
import { useEffect, useState } from 'react';
import './FilteredPage.css';
import ProductCard from '../../components/ProductCard/ProductCard';

export default function FilteredPage() {
    const [maxPrice, setMaxPrice] = useState(1000); // [1
    const [price, setPrice] = useState(maxPrice);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const body = await getAllProductsService();
                const maxPrice = Math.ceil(
                    body.data.sort((a, b) => b.price - a.price)[0].price
                );
                setMaxPrice(maxPrice);
            } catch (err) {
                console.log(err.message);
            }
        };
        fetchProducts();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = `?category=${e.target[0].value}&maxPrice=${e.target[1].value}&state=${e.target[2].value}&place=${e.target[3].value}`;
        const results = await getSearchProductsService(data);
        if (
            results.status === 'ok' &&
            results.data !== 'No hay ningún resultado con esos filtros'
        ) {
            setProducts(results.data);
        } else {
            setProducts([]);
            document.querySelector('.no-results').style.display = 'block';
        }
    };

    const handleCardClick = async (e, key) => {
        e.preventDefault();
        console.log(key);
        // alert(`Hola soy la carta ${e.target}`);
    };

    const resetEventHandle = (e) => {
        e.preventDefault();
        document.querySelector('.select-category').value = '';
        document.querySelector('.range-price').value = `${maxPrice}`;
        document.querySelector(
            '.range-price__text'
        ).textContent = `${maxPrice}`;
        document.querySelector('.select-state').value = '';
        document.querySelector('.search-location').value = '';
        setPrice(maxPrice);
    };

    return (
        <>
            <div className="container">
                <aside className="container-aside">
                    <section className="container-aside__section">
                        <form
                            className="container-aside__form"
                            onSubmit={handleSubmit}
                        >
                            <h3>Categorias</h3>
                            <select name="select" className="select-category">
                                <option value="" defaultValue>
                                    Selecciona categoría
                                </option>
                                <option value="Audio">Audio</option>
                                <option value="Camaras de fotos">
                                    Cámaras de fotos
                                </option>
                                <option value="Consolas">Consolas</option>
                                <option value="Juguetes">Juguetes</option>
                                <option value="Maquinas de escribir">
                                    Máquinas de escribir
                                </option>
                                <option value="Ordenadores">Ordenadores</option>
                                <option value="Relojes">Relojes</option>
                                <option value="Telefonos">Teléfonos</option>
                                <option value="Televisores">Televisores</option>
                                <option value="Video">Video</option>
                                <option value="Otros">Otros</option>
                            </select>
                            <h3>Precio</h3>
                            <input
                                type="range"
                                min="0"
                                max={maxPrice && maxPrice}
                                step="1"
                                // value={maxPrice && maxPrice}
                                className="range-price"
                                onChange={(e) => setPrice(e.target.value)}
                            />
                            <p className="range-price__text">{price}</p>
                            <div className="container-aside__state">
                                <h3>Estado del producto</h3>
                                <select name="select" className="select-state">
                                    <option value="" defaultValue>
                                        Selecciona estado
                                    </option>
                                    <option value="Nuevo">Nuevo</option>
                                    <option value="Como nuevo">
                                        Como nuevo
                                    </option>
                                    <option value="En buen estado">
                                        En buen estado
                                    </option>
                                    <option value="En condiciones aceptables">
                                        En condiciones aceptables
                                    </option>
                                    <option value="No funciona">
                                        No funciona
                                    </option>
                                </select>
                            </div>
                            <h3>Localidad</h3>
                            <input type="text" className="search-location" />
                            <button type="submit" className="btn-filter">
                                Aplicar filtros
                            </button>
                            <button
                                className="btn-reset"
                                onClick={resetEventHandle}
                            >
                                Limpiar filtros
                            </button>
                        </form>
                    </section>
                </aside>
                <main className="container-main">
                    {products.length > 0 && (
                        <ul>
                            {products.map((product) => (
                                <li
                                    key={product.id}
                                    onClick={(event) =>
                                        handleCardClick(event, product.id)
                                    }
                                >
                                    <ProductCard
                                        productName={product.productName}
                                        price={product.price}
                                        image={product.image}
                                    />
                                </li>
                            ))}
                        </ul>
                    )}
                    <h2 className="no-results">Sin resultados</h2>
                </main>
            </div>
        </>
    );
}
