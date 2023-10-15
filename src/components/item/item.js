import { Link } from "react-router-dom";
import { useDarkModeContext } from '../../context/DarkModeContext';
const Item = ({prod}) => {
    const {DarkMode} = useDarkModeContext();
    return (
        <div className="card cardProducto" style={{ width: '18rem' }}>
            <img src={prod.img} className="card-img-top" alt="..." />
            <div className={`card-body ${DarkMode ? 'cardBodyDark' : ''}`}>
                <h5 className="card-title">{(prod.nombre)}</h5>
                <p className="card-text">Precio $ {new Intl.NumberFormat('de-DE').format(prod.precio)}</p>
                <button className='btn btn-secondary'><Link className="nav-link" to={`/producto/${prod.id}`}>Ver Producto</Link></button>
            </div>
        </div>
    );
}

export default Item;