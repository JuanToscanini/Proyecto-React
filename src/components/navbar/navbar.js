import CartWidget from "../cartWidget/cartWidget";
import { Link } from "react-router-dom";
import Categorias from "../categorias/categorias";
import { useDarkModeContext } from '../../context/DarkModeContext';
import BotonDarkMode from "./botonDarkMode/BotonDarkMode";
const Navbar = () => {
    const {DarkMode} = useDarkModeContext();
    return (
        <nav className={`navbar navbar-expand-lg navbar-dark ${DarkMode ? 'bg-secondary' : 'bg-dark'}`}>
            <div className="container-fluid">
                <button className='botonPrincipalNavBar'><Link className='brandName' to={"/"}>Home</Link></button>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span>
                </button>
                <Categorias/>
                <CartWidget/>
                <BotonDarkMode/>
            </div>
        </nav>
    );
}

export default Navbar;
