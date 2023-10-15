import { Link } from "react-router-dom";
import { useCarritoContext } from "../../context/CarritoContext";
import { useDarkModeContext } from '../../context/DarkModeContext';
const Carrito = () => {
    const { carrito, emptyCart, totalPrice, removeItem } = useCarritoContext()
    const { DarkMode } = useDarkModeContext()
    return (
        <>
            {carrito.length === 0 ?
                <div className="cartContainer">
                    <h1>Carrito vacio</h1>
                    <button className="btn btn-dark"><Link className="text-decoration nav-link" to={'/'}>Continuar comprando</Link></button>
                </div>
                :
                <div>
                    {carrito.map(prod =>
                        <div className="card mb-3 container cartContainer" key={prod.id} style={{ maxWidth: '540px' }}>
                            <div className="row g-0 imagenCarrito">
                                <div className="col-md-4">
                                    <img src={prod.img} alt="Producto" className="img-fluid rounded-start" />
                                </div>
                            </div>
                            <div>
                                <div className={`card-body carritoBody ${DarkMode ? 'cardBodyDark' : ''}`}>
                                    <h5 className="card-title"> {`${prod.nombre}`}</h5>
                                    <p className="card-text-carrito">Cantidad: {prod.cant}</p>
                                    <p className="card-text-carrito">Precio unitario: {new Intl.NumberFormat('de-De').format(prod.precio)}</p>
                                    <p className="card-text-carrito">Precio total: {new Intl.NumberFormat('de-De').format(prod.precio * prod.cant)}</p>
                                    <button className="btn btn-danger card-text-carrito" onClick={() => removeItem(prod.id)}>Eliminar Producto</button>
                                </div>
                            </div>

                        </div>
                    )}
                    <div className="container cartContainer">
                        <p>Resumen de la compra: ${new Intl.NumberFormat('de-DE').format(totalPrice())}</p>
                        <button className="btn btn-danger" onClick={emptyCart}>Vaciar Carrito</button>
                        <button className="btn btn-dark "><Link className="text-decoration" to={'/checkout'}>Finalizar Compra</Link></button>
                        <button className="btn btn-dark"><Link className="text-decoration" to={'/'}>Continuar comprando</Link></button>
                    </div>
                </div>
            }
        </>
    );
}

export default Carrito;