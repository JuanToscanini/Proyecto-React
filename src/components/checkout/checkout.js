import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createOrdenCompra, getOrdenCompra, getProducto, updateProducto } from '../../assets/firebase';
import { useCarritoContext } from "../../context/CarritoContext";
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
const Checkout = () => {
    const initialValues={nombre: "", email: "", validateEmail: "", DNI: "", celular: "", direccion: ""}
    const [formValues, setFormValues]=useState(initialValues);
    const [formErrors, setFormErrors]=useState({});
    const [isSubmit, setIsSubmit] = useState(false);    
    const {totalPrice, carrito, emptyCart} = useCarritoContext();
    const datosFormulario = React.useRef();
    let navigate = useNavigate();

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            consultarFormulario();
        }
      }, [formErrors]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
        e.target.reset();
    };

    const handleChange = (e)=>{
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    //Validaciones
    const validate = (values)=>{
        const errors ={};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.email) {
            errors.email = "El email es requerido";
        } else if (!regex.test(values.email)) {
            errors.email = "Ese no es un formato valido de email";
        }
        if (!values.validateEmail){
            errors.validateEmail = "Debe ingresar nuevamente el email";            
        }else if (!regex.test(values.validateEmail)) {
            errors.validateEmail = "Ese no es un formato valido de email";
        }else if (values.validateEmail!==values.email){
            errors.validateEmail = "Los emails no coinciden";
        }
        return errors;
    };

    const consultarFormulario = (e) => {
        const datForm = new FormData(datosFormulario.current);
        const cliente = Object.fromEntries(datForm);
        const aux = [...carrito]
        aux.forEach(prodCarrito => {
            getProducto(prodCarrito.id).then(prodBDD => {
                if(prodBDD.stock >= prodCarrito.cant) {
                    prodBDD.stock -= prodCarrito.cant
                    updateProducto(prodCarrito.id, prodBDD);                  
                } else {
                    toast.error(`El producto ${prodBDD.nombreAMostrar} no tiene stock`);                    
                    emptyCart();
                    navigate("/");            
                }
            });
        });

        delete cliente["validateEmail"];

        createOrdenCompra(cliente,totalPrice(), new Date().toISOString().slice(0,10)).then(ordenCompra => {
            getOrdenCompra(ordenCompra.id).then(item => {
                toast.success(`Gracias por su compra, su orden es ${item.id}`);
                emptyCart();     
                navigate("/");
            }).catch(error => {
                toast.error("Su orden no fue generada con exito");
                console.error(error);
            });    
        });
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit} ref={datosFormulario}>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre y Apellido</label>
                    <input type="text" className="form-control" name="nombre"  value={formValues.nombre} onChange={handleChange} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="text" className="form-control" name="email" value={formValues.email} onChange={handleChange}/>
                    <p>{formErrors.email}</p>
                </div>
                <div className="mb-3">
                    <label htmlFor="email2" className="form-label">Repetir Email</label>
                    <input type="text" className="form-control" name="validateEmail" value={formValues.validateEmail} onChange={handleChange}/>
                    <p>{formErrors.validateEmail}</p>
                </div>
                <div className="mb-3">
                    <label htmlFor="dni" className="form-label">DNI</label>
                    <input type="number" className="form-control" name="DNI" value={formValues.DNI} onChange={handleChange} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="celular" className="form-label">Celular</label>
                    <input type="number" className="form-control" name="celular" value={formValues.celular} onChange={handleChange} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="direccion" className="form-label">Dirección</label>
                    <input type="text" className="form-control" name="direccion"  value={formValues.direccion} onChange={handleChange} required/>
                </div>
                <button type="submit" className="btn btn-primary">Finalizar Compra</button>
            </form>
        </div>
    );
}

export default Checkout;