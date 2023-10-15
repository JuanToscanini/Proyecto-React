import { Link } from 'react-router-dom';
import { useCarritoContext } from "../../context/CarritoContext";
const CartWidget = () => {
    const {getItemQuantity} = useCarritoContext();

    return (
        <ul className="navbar-nav">
            <li className="nav-link">
                <button className="btn btn-light"><Link to={"/carrito"}>🛒</Link></button>
            </li>
            {getItemQuantity() > 0 && <span className='numero'>{getItemQuantity()}</span>}
        </ul>
    );
}

export default CartWidget;
