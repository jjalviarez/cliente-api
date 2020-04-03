import React, { useState, useEffect, Fragment } from 'react'

import clienteAxios from '../../config/axios';


const Clientes = () => {

    //Trabajar con el state
    // clientes = state, guardarCliente 0 funcion para guardar el state
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
    }, []);


    return (
        <Fragment> 
            <h2>Clientes</h2>
            <ul className="listado-clientes">
                {clientes.map((cliente) => {
                    console.log(cliente);
                })}
            </ul>
        </Fragment> 
    );
};

export default Clientes;