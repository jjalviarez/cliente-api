import React, { useState, useEffect, Fragment } from 'react';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';

const NuevoProducto = props => {
    const {id}= props.match.params

    //producto= State, guardarProducto = setStaet
    const [producto, guardarProducto] = useState({
        nombre:'',
        precio:''
    });

    //archivo= State, guardarArchivo = setStaet
    const [archivo, guardarArchivo] = useState('');


    //Query a la API Buscar uno
    const consultaAPI = async () => {
        const consulta = await clienteAxios.get('/productos/'+id);
        //console.log('consulta: ', consulta.data)
        //colocar  resultado en el state
        guardarProducto(consulta.data); 
    }

    //Query a la API Avtualizar
    const handleSubmit =  e => {
        e.preventDefault();
        clienteAxios.put('/productos/'+producto._id,producto)
            .then(res => {
                console.log('res :', res);
                Swal.fire(
                    'Producto Actualizado correctamente!',
                    'You clicked the button!',
                    'success'
                )
                //redireccionar 
                props.history.push('/productos');
            })
            .catch(
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                })
            )
        
    }   
    
    
    const handleChange = (e) => {
        guardarProducto({
            //Actualuzamos el state agregando una copia del State actual
            ...producto,
            [e.target.name]:e.target.value});
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
            <h2>Nuevo Producto</h2>
            <form 
                onSubmit={handleSubmit}
            >
                <legend>Llena todos los campos</legend>
                <div className="campo">
                    <label>Nombre:</label>
                    <input 
                        type="text" 
                        placeholder="Nombre Producto" 
                        name="nombre" 
                        onChange={handleChange}
                    />
                </div>
                <div className="campo">
                    <label>Precio:</label>
                    <input 
                        type="number" 
                        name="precio" 
                        min={0.00} 
                        step="0.01" 
                        placeholder="Precio" 
                        onChange={handleChange}
                    />
                </div>
                <div className="campo">
                    <label>Imagen:</label>
                    <input 
                        type="file" 
                        name="imagen" 
                        onChange={handleChange}
                    />
                </div>
                <div className="enviar">
                    <input 
                        type="submit" 
                        className="btn btn-azul" 
                        defaultValue="Agregar Producto" 
                    />
                </div>
            </form>        
        </Fragment>
    );
};




export default withRouter(NuevoProducto);