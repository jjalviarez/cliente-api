import React, { useState, Fragment } from 'react';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';

const NuevoProducto = props => {

    //producto= State, guardarProducto = setStaet
    const [producto, guardarProducto] = useState({
        nombre:'',
        precio:''
    });

    //archivo= State, guardarArchivo = setStaet
    const [archivo, guardarArchivo] = useState('');




    //Query a la API Nuevo
    const handleSubmit =  e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('nombre', producto.nombre);
        formData.append('precio', producto.precio);
        formData.append('imagen', archivo);
        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        clienteAxios.post('/productos', formData, config)
            .then(res => {
                console.log('res :', res);
                Swal.fire(
                    'Producto creado correctamente!',
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

    const handleChangeFile = (e) => {
        //console.log('e.target.files[0] :', e.target.files[0]);
        guardarArchivo(e.target.files[0]);
    }   


    //Validar el formulario
    const validarProducto = () => {
        let valido= producto.nombre.length && producto.precio.length;
        return !valido;
    }



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
                        onChange={handleChangeFile}
                    />
                </div>
                <div className="enviar">
                    <input 
                        type="submit" 
                        className="btn btn-azul" 
                        value="Agregar Producto" 
                        disabled={validarProducto()}
                    />
                </div>
            </form>        
        </Fragment>
    );
};




export default withRouter(NuevoProducto);