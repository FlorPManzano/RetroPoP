// import ListProducts from '../../components/ListProducts/ListProducts';
// import Navbar from '../../components/Navbar/Navbar';
import {
    getSearchProductsService,
    getAllProductsService,
} from '../../services/fetchData';
import { useEffect, useState } from 'react';
import './FilteredPage.css';
import ProductCard from '../../components/ProductCard/ProductCard';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth.js';

export default function FilteredPage() {
    const { authUser } = useAuth();

    const [maxPrice, setMaxPrice] = useState(); // [1
    const [products, setProducts] = useState([]);
    const [valuePrice, setValuePrice] = useState(maxPrice); //
    // const [params, setParams] = useState(''); //
    // const [loading, setLoading] = useState(false); //

    const navigate = useNavigate();
    const name = useLocation().search;
    console.log(name);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const body = await getAllProductsService();
                const maxPrice = Math.ceil(
                    body.data.sort((a, b) => b.price - a.price)[0].price
                );
                console.log(maxPrice);
                // setMaxPrice(maxPrice);
                // setProducts(body.data);
                setMaxPrice(maxPrice);
                setValuePrice(maxPrice);
            } catch (err) {
                console.log(err.message);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const results = await getSearchProductsService(name);

                console.log(results);

                if (
                    results.status === 'ok' &&
                    results.data !== 'No hay ningún resultado con esos filtros'
                ) {
                    setProducts(results.data);
                    document.querySelector('.no-results').style.display =
                        'none';
                } else {
                    setProducts([]);
                    document.querySelector('.no-results').style.display =
                        'block';
                }
            } catch (err) {
                console.log(err.message);
            }
        };
        fetchProducts();
    }, [name]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(e.target[1].value);

        const data = `?category=${e.target[0].value}&maxPrice=${e.target[1].value}&state=${e.target[2].value}&place=${e.target[3].value}`;
        console.log(data);
        navigate(`/search/${data}`);
        // const results = await getSearchProductsService(data);
        // if (
        //     results.status === 'ok' &&
        //     results.data !== 'No hay ningún resultado con esos filtros'
        // ) {
        //     setProducts(results.data);
        //     document.querySelector('.no-results').style.display = 'none';
        // } else {
        //     setProducts([]);
        //     document.querySelector('.no-results').style.display = 'block';
        // }
    };

    const handleCardClick = async (e, key) => {
        e.preventDefault();
        console.log(key);
        navigate(`/product/${key}`);
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
        setValuePrice(maxPrice);
    };

    const handleChangeValuePrice = (e) => {
        setValuePrice(e.target.value);
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
                            <section className="container-aside__section_category">
                                <h3 className="filter-h3">Categorias</h3>
                                <select
                                    name="select"
                                    className="select-category"
                                >
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
                                    <option value="Ordenadores">
                                        Ordenadores
                                    </option>
                                    <option value="Relojes">Relojes</option>
                                    <option value="Telefonos">Teléfonos</option>
                                    <option value="Televisores">
                                        Televisores
                                    </option>
                                    <option value="Video">Video</option>
                                    <option value="Otros">Otros</option>
                                </select>
                            </section>
                            <section className="container-aside__section_price">
                                <h3 className="filter-h3">Precio</h3>
                                <input
                                    type="range"
                                    min="0"
                                    max={maxPrice}
                                    step="1"
                                    value={valuePrice}
                                    className="range-price"
                                    onChange={handleChangeValuePrice}
                                />
                                <p className="range-price__text">
                                    {valuePrice} €
                                </p>
                            </section>
                            <div className="container-aside__state">
                                <h3 className="filter-h3">
                                    Estado del producto
                                </h3>
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
                            <section className="container-aside__section_location">
                                <h3 className="filter-h3">Localidad</h3>
                                <input
                                    type="text"
                                    className="search-location"
                                />
                            </section>
                            <div className="container-aside__buttons">
                                <button
                                    className="btn-reset"
                                    onClick={resetEventHandle}
                                >
                                    Limpiar filtros
                                </button>
                                <button type="submit" className="btn-filter">
                                    Aplicar filtros
                                </button>
                            </div>
                        </form>
                    </section>
                </aside>
                <main className="container-main">
                    <div className="container-main__container">
                        {products.length > 0 && (
                            <ul className="ul-filtered">
                                {products
                                    .filter(
                                        (product) =>
                                            product.isSelled === 0 &&
                                            product.userId !== authUser?.id
                                    )
                                    .map((product) => (
                                        <li
                                            className="li-filtered"
                                            key={product.id}
                                            onClick={(event) =>
                                                handleCardClick(
                                                    event,
                                                    product.id
                                                )
                                            }
                                        >
                                            <ProductCard
                                                productName={
                                                    product.productName
                                                }
                                                price={product.price}
                                                image={product.image}
                                            />
                                        </li>
                                    ))}
                            </ul>
                        )}

                        <h2 className="no-results">Sin resultados</h2>
                    </div>
                </main>
            </div>
        </>
    );
}
