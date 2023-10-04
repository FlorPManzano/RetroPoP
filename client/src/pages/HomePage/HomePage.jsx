import './HomePage.css';
import CategoryNav from '../../components/CategoryNav/CategoryNav';
// import Navbar from '../../components/Navbar/Navbar';
import MainTitle from '../../components/MainTitle/MainTitle';
import ListProducts from '../../components/ListProducts/ListProducts';

export default function HomePage() {
    return (
        <>
            <MainTitle />
            <CategoryNav />
            <ListProducts />
        </>
    );
}
