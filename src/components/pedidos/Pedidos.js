import React, { useState, useEffect, Fragment, useContext } from 'react'
import clienteAxios from '../../config/axios';
import Spinner from '../layout/Spinner';
import Pedido from './Pedido';
//Importar el context 
import { CRMContext } from '../../context/CRMContext';

const Pedidos = props => {

    //Trabajar con el state
    // pedidos = state, gurardarPedidos funcion para guardar el state
    const [pedidos, gurardarPedidos] = useState([]);

    const [auth, guardarAuth] = useContext(CRMContext);

    //user effect es similar a componetdidmont y willmount
    useEffect(() => {
        if(auth.token !== '' && auth.auth) {

            //Query a la API
            const consultaAPI =  () => {
                clienteAxios.get('/pedidos')
                .then(res => {
                    //colocar  resultado en el state
                    gurardarPedidos(res.data); 
                }).catch(err => {
                    if (err.response.sratus === 500)  props.history.push('/login');
                  })
            }


            consultaAPI();
            /*return () => {
                cleanup
            }*/

        }
        else {
            props.history.push('/login');
        }

    }, [pedidos]);

    if(!auth.auth) props.history.push('/login');

    
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