import React, { useState, useEffect, Fragment } from 'react'
import clienteAxios from '../../config/axios';
import { Link } from 'react-router-dom';
import Producto from './Producto';


const Productos = () => {

    //Trabajar con el state
    // producto = state, guardarProductos funcion para guardar el state
    const [productos, gurardarProductos] = useState([]);

    //Query a la API
    const consultaAPI = async () => {
        const consulta = await clienteAxios.get('/productos');
        //colocar  resultado en el state
        gurardarProductos(consulta.data); 
    }
    //user effect es similar a componetdidmont y willmount
    useEffect(() => {
        consultaAPI();
        /*return () => {
            cleanup
        }*/
    }, [productos]);


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