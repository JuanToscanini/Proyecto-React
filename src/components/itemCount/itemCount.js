import {useState} from 'react';

const ItemCount = ({stock, inicial, onAdd}) => {
    const [contador, setContador] = useState(inicial);

    const sumar = () => contador < stock && setContador(contador + 1);

    const restar = () => contador > 1 && setContador(contador - 1);

    const agregarAlCarrito = () => onAdd(contador);
    
    return (
        <div>
            <button className='btn btn-dark btn-padding' onClick={sumar}>+</button>
                {contador}
            <button className='btn btn-dark btn-padding' onClick={restar}>-</button> <br/>
            <button className='btn btn-dark btn-padding' onClick={agregarAlCarrito}>Agregar al carrito</button>
        </div>
    );
}

export default ItemCount;