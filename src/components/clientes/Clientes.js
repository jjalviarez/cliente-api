import React, { useState, useEffect, Fragment } from 'react'
import clienteAxios from '../../config/axios';
import Cliente from './Cliente';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';

const Clientes = () => {

    //Trabajar con el state
    // clientes = state, guardarClientes funcion para guardar el state
    const [clientes, gurardarClientes] = useState([]);

    //Query a la API
    const consultaAPI =  () => {
        clienteAxios.get('/clientes')
        .then(res => {
            //colocar  resultado en el state
            gurardarClientes(res.data); 
        })
    }

    //user effect es similar a componetdidmont y willmount
    useEffect(() => {
        consultaAPI();
        /*return () => {
            cleanup
        }*/
    }, [clientes]);

    //Spinner de Carga
    if(!clientes.length) return <Spinner/>

    return (
        <Fragment> 
            <h2>Clientes</h2>
            <Link to={"/clientes/nuevo"} className="btn btn-verde nvo-cliente"> 
                <i className="fas fa-plus-circle"></i>
                Nuevo Cliente
            </Link>
            <ul className="listado-clientes">
                {clientes.map((cliente) => (
                    <Cliente 
                        key={cliente._id}
                        cliente={cliente}
                    />
                ))}
            </ul>
        </Fragment> 
    );
};

export default Clientes;