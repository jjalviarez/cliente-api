import React, { useState, useEffect, Fragment } from 'react'
import clienteAxios from '../../config/axios';
import Spinner from '../layout/Spinner'
import Pedido from './Pedido';

const Pedidos = () => {

    //Trabajar con el state
    // pedidos = state, gurardarPedidos funcion para guardar el state
    const [pedidos, gurardarPedidos] = useState([]);

    //Query a la API
    const consultaAPI =  () => {
        clienteAxios.get('/pedidos')
        .then(res => {
            //colocar  resultado en el state
            gurardarPedidos(res.data); 
        })
    }
    //user effect es similar a componetdidmont y willmount
    useEffect(() => {
        consultaAPI();
        /*return () => {
            cleanup
        }*/
    }, [pedidos]);


    //Spinner de Carga
    if(!pedidos.length) return <Spinner/>

    return (
        <Fragment> 
              <h2>Pedidos</h2>
            <ul className="listado-pedidos">
                {pedidos.map((pedido) => (
                    <Pedido
                        key={pedido._id}
                        pedido={pedido}
                    />
                ))}
            </ul>
        </Fragment> 
    );
};

export default Pedidos;