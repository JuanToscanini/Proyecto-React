import { initializeApp } from "firebase/app";
import {getFirestore, addDoc, getDocs, getDoc, updateDoc, deleteDoc, collection, doc} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAw-tv-HavsNo7GD7QRpxsk4vtXqPOJYJ8",
    authDomain: "proyectoreact--ecommerce.firebaseapp.com",
    projectId: "proyectoreact--ecommerce",
    storageBucket: "proyectoreact--ecommerce.appspot.com",
    messagingSenderId: "900570414325",
    appId: "1:900570414325:web:168004c57d7c55bd8cd9bc"
  };
  

  const app = initializeApp(firebaseConfig);

const db = getFirestore()

const cargarBDD = async () => {
    const promise = await fetch('../json/productos.json')
    const productos = await promise.json()
    productos.forEach(async (prod) => {
        await addDoc(collection(db,"productos"), {
            idCategoria: prod.idCategoria,
            nombre: prod.nombre,
            precio: prod.precio,
            img: prod.img,
            stock: prod.stock
        })
    })
}

const getProductos = async() => {
    const productos = await getDocs(collection(db, "productos"))
    const items = productos.docs.map(prod => {
        return {...prod.data(), id: prod.id}    
    })
    return items
}

const getProducto =  async (id) => {
    const producto = await getDoc(doc(db, "productos", id))
    const item = {...producto.data(), id: producto.id}
    return item
}

const updateProducto = async (id, info) => {
    const estado = await updateDoc(doc(db,"productos", id), info)
    return estado
}

const deleteProducto = async(id) =>{
    const estado = await deleteDoc(doc(db, "productos", id))
    return estado
}

const createOrdenCompra = async (cliente, preTotal, fecha ) => {
    const ordenCompra = await addDoc(collection(db, "ordenCompra"),{
        nombre: cliente.nombre,
        email: cliente.email,
        dni: cliente.DNI,
        direccion: cliente.direccion,
        celular: cliente.celular,
        fecha: fecha,
        precioTotal: preTotal
    })

    return ordenCompra
}

const getOrdenCompra =  async (id) => {
    const ordenCompra = await getDoc(doc(db, "ordenCompra", id))
    const item = {...ordenCompra.data(), id: ordenCompra.id}
    return item
}
// cargarBDD().then(productos => console.log(productos))


export {cargarBDD, getProductos, getProducto, updateProducto, deleteProducto, createOrdenCompra, getOrdenCompra}