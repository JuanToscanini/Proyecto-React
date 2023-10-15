import './App.css';
import 'react-toastify/dist/ReactToastify.css'
import Navbar from './navbar/navbar';
import ItemListContainer from "./itemListContainer/itemListContainer";
import ItemDetailContainer from './itemDetailContainer/itemDetailContainer';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Carrito from './carrito/carrito';
import Checkout from './checkout/checkout';
import { DarkModeProvider } from '../context/DarkModeContext';
import { ToastContainer } from 'react-toastify';
const App = () => {
  return (
    <>
      <BrowserRouter>
        <DarkModeProvider>
          <Navbar />
          <Routes>
            <Route path='/' element={<ItemListContainer />} />
            <Route path='/producto/:id' element={<ItemDetailContainer />} />
            <Route path='/category/:category' element={<ItemListContainer />} />
            <Route path='/carrito' element={<Carrito />} />
            <Route path='/checkout' element={<Checkout />} />
          </Routes>
          <ToastContainer />
        </DarkModeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
