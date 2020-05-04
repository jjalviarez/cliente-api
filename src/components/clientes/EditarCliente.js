import React, { useState, useEffect, useContext, Fragment } from 'react';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';
//Importar el context 
import { CRMContext } from '../../context/CRMContext';
import Spinner from '../layout/Spinner';

const EditarCliente = props => {
    const {id}= props.match.params
    //Trabajar con el state
    // cliente = state, guardarCliente 0 funcion para guardar el state
    const [cliente, datosCliente] = useState({
        nombre:'',
        apellido:'',
        empresa:'',
        email:'',
        telefono:''
    });

    const [auth, guardarAuth] = useContext(CRMContext);

    //Query a la API Buscar uno
    const consultaAPI = async () => {

        if(auth.token !== '' && auth.auth) {

            try {
                const consulta = await clienteAxios.get('/clientes/'+id,{
                    headers: {
                    'Authorization': `Bearer ${auth.token}`
                    }
                });
                //console.log('consulta: ', consulta.data)
                //colocar  resultado en el state
                datosCliente(consulta.data); 
            } catch (err) {
                if (err.response.sratus === 500)  props.history.push('/login');

            }
        }
        else {
            props.history.push('/login');
        }
    }

    //Query a la API Avtualizar
    const handleSubmit =  e => {
        e.preventDefault();
        if(auth.token !== '' && auth.auth) {
            clienteAxios.put('/clientes/'+cliente._id,cliente)
            .then(res => {
                //console.log('res :', res);
                Swal.fire(
                    'Cleinte Actualizado correctamente!',
                    'You clicked the button!',
                    'success'
                )
                //redireccionar 
                props.history.push('/');
            })
            .catch(err =>{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                })
                if (err.response.sratus === 500)  props.history.push('/login');

            })
        }
        else {
            props.history.push('/login');
        }
    }

    const handleChange = (e) => {
        datosCliente({
            //Actualuzamos el state agregando una copia del State actual
            ...cliente,
            [e.target.name]:e.target.value});
    }

    //Validar el formulario
    const validarCliente = () => {
    let valido=cliente.nombre.length&&
                cliente.apellido.length&&
                cliente.empresa.length&&
                cliente.email.length&&
                cliente.telefono.length;
    return !valido;
    }



    //user effect es similar a componetdidmont y willmount
    useEffect(() => {
        consultaAPI();
        /*return () => {
            cleanup
        }*/
    }, []);

    if(!auth.auth) props.history.push('/login');


    //Spinner de Carga
    if(!cliente.nombre.length) return <Spinner/>

    return (
        <Fragment>  
            <h2>Actualizar CLiente</h2>
            <form 
                onSubmit={handleSubmit}
            >
                <legend>Llena todos los campos</legend>
                <div className="campo">
                    <label>Nombre:</label>
                    <input
                        type="text" 
                        placeholder="Nombre Cliente" 
                        name="nombre" 
                        onChange={handleChange}
                        value={cliente.nombre}
                        />
                </div>
                <div className="campo">
                    <label>Apellido:</label>
                    <input
                        type="text" 
                        placeholder="Apellido Cliente" 
                        name="apellido" 
                        onChange={handleChange}
                        value={cliente.apellido}
                        />
                </div>
                <div className="campo">
                    <label>Empresa:</label>
                    <input
                        type="text" 
                        placeholder="Empresa Cliente" 
                        name="empresa" 
                        onChange={handleChange}
                        value={cliente.empresa}
                    />
                </div>
                <div className="campo">
                    <label>Email:</label>
                    <input
                        type="email" 
                        placeholder="Email Cliente" 
                        name="email" 
                        onChange={handleChange}
                        value={cliente.email}
                    />
                </div>
                <div className="campo">
                    <label>Teléfono:</label>
                    <input type="text" 
                    placeholder="Teléfono Cliente" 
                    name="telefono" 
                    onChange={handleChange}
                    value={cliente.telefono}
                    />
                </div>
                <div className="enviar">
                    <input
                        type="submit" 
                        className="btn btn-azul" 
                        defaultValue="Grardar Cambios" 
                        disabled={validarCliente()}
                    />
                </div>
            </form>
        </Fragment>
    );
};


// HOC (withRouter) toma un componente y tetorna unn nuevo componente 
export default withRouter(EditarCliente);