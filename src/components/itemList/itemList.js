import Item from '../item/item'
const ItemList = ({productsList}) => {
    return (
        <div className='row contenedor'>
            {productsList.map(producto => <Item key={producto.id} prod = {producto}/>)}
        </div>
    );
}

export default ItemList;