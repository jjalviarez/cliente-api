import React, { useState, useEffect, Fragment } from 'react'
import clienteAxios from '../../config/axios';
import { Link } from 'react-router-dom';
import Producto from './Producto';
import Spinner from '../layout/Spinner'

const Productos = () => {

    //Trabajar con el state
    // producto = state, guardarProductos funcion para guardar el state
    const [productos, gurardarProductos] = useState([]);


    
    //user effect es similar a componetdidmont y willmount
    useEffect(() => {

        //Query a la API
        const consultaAPI =  () => {
            clienteAxios.get('/productos')
            .then(res => {
                //colocar  resultado en el state
                gurardarProductos(res.data); 
            })
        }
        
        consultaAPI();
        /*return () => {
            cleanup
        }*/
    }, [productos]);

    //Spinner de Carga
    if(!productos.length) return <Spinner/>

    return (
        <Fragment> 
            <h2>Productos</h2>
            <Link to={"/productos/nuevo"} 
                className="btn btn-verde nvo-cliente"> 
                <i className="fas fa-plus-circle"></i>
                Nuevo Producto
            </Link>
            <ul className="listado-productos">
                {productos.map((producto) => (
                    <Producto 
                        key={producto._id}
                        producto={producto}
                    />
                ))}
            </ul>
        </Fragment> 
    );
};

export default Productos;