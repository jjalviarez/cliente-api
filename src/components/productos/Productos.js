import React, { useState, useEffect, Fragment, useContext } from 'react'
import clienteAxios from '../../config/axios';
import { Link, withRouter } from 'react-router-dom';
import Producto from './Producto';
import Spinner from '../layout/Spinner'
//Importar el context 
import { CRMContext } from '../../context/CRMContext';


const Productos = props => {

    //Trabajar con el state
    // producto = state, guardarProductos funcion para guardar el state
    const [productos, gurardarProductos] = useState([]);

    const [auth, guardarAuth] = useContext(CRMContext);


    
    //user effect es similar a componetdidmont y willmount
    useEffect(() => {
        if(auth.token !== '' && auth.auth) {
            //Query a la API
            const consultaAPI =  () => {
                clienteAxios.get('/productos',{
                        headers: {
                        'Authorization': `Bearer ${auth.token}`
                        }
                    })
                .then(res => {
                    //colocar  resultado en el state
                    gurardarProductos(res.data); 
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

    }, [productos]);


    if(!auth.auth) props.history.push('/login');

    
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

export default withRouter(Productos);