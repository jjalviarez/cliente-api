import React, { useState, useEffect, Fragment, useContext } from 'react'
import clienteAxios from '../../config/axios';
import Cliente from './Cliente';
import { Link, withRouter } from 'react-router-dom';
import Spinner from '../layout/Spinner';
//Importar el context 
import { CRMContext } from '../../context/CRMContext';



const Clientes = props => {

    //Trabajar con el state
    // clientes = state, guardarClientes funcion para guardar el state
    const [clientes, gurardarClientes] = useState([]);

    const [auth, guardarAuth] = useContext(CRMContext);

    //console.log('auth', auth) 



    //user effect es similar a componetdidmont y willmount
    useEffect(() => {
        if(auth.token !== '' && auth.auth) {

                //Query a la API
            const consultaAPI =  () => {
                clienteAxios.get('/clientes',{
                    headers: {
                    'Authorization': `Bearer ${auth.token}`
                    }
                })
                .then(res => {
                    //colocar  resultado en el state
                    gurardarClientes(res.data); 
                }).catch(err => {
                    if (err.response.sratus === 500)  props.history.push('/login');
                  })

            }


            consultaAPI();
        }
        else {
            props.history.push('/login');
        }
    }, [clientes]);


    if(!auth.auth) props.history.push('/login');


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

export default withRouter(Clientes);