import React, { useState, useEffect, Fragment } from 'react'
import clienteAxios from '../../config/axios';
import Cliente from './Cliente';
import { Link } from 'react-router-dom';


const Clientes = () => {

    //Trabajar con el state
    // clientes = state, guardarClientes funcion para guardar el state
    const [clientes, gurardarClientes] = useState([]);



    //Query a la API
    const consultaAPI = async () => {
        const consulta = await clienteAxios.get('/clientes');
        //colocar  resultado en el state
        gurardarClientes(consulta.data); 
    }

    //user effect es similar a componetdidmont y willmount
    useEffect(() => {
        consultaAPI();
        /*return () => {
            cleanup
        }*/
    }, [clientes]);


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