import ItemCount from "../itemCount/itemCount";
import { Link } from "react-router-dom";
import { useDarkModeContext } from '../../context/DarkModeContext';
import { useCarritoContext } from "../../context/CarritoContext";
const ItemDetail = ({ item }) => {
    const {DarkMode} = useDarkModeContext();
    const {addItem} = useCarritoContext();
    const onAdd = (contador) => {
        addItem(item, contador);
    }   
    return (
        <div>
            <div className="row g-0">
                <div className="col-md-4">
                    <img src={item.img} alt="" className="img-fluid rounded-start" />
                </div>
                <div className={`col-md-8 ${DarkMode ? 'cardBodyDark' : ''}`}>
                    <div className={`card-body ${DarkMode ? 'cardBodyDark' : ''}`}>
                        <h5 className="card-title">{item.nombre}</h5>
                        <p className="card-text">Precio: $ {new Intl.NumberFormat('de-DE').format(item.precio)} </p>
                        <p className="card-text">Stock: {item.stock} </p>
                        <ItemCount inicial={1} stock={item.stock} onAdd={onAdd} /><br />
                        <button className="btn btn-secondary"><Link to={'/carrito'} className="nav-link">Finalizar Compra</Link></button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ItemDetail;
