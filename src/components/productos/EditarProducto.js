import React, { useState, useEffect, Fragment } from 'react';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';
import Spinner from '../layout/Spinner'

const EditarProducto = props => {
    const {id}= props.match.params

    const [producto, datosProducto] = useState({
        nombre:'',
        precio:'',
        imagen:''
    });

    //archivo= State, guardarArchivo = setStaet
    const [archivo, guardarArchivo] = useState('');


    //Query a la API Buscar uno
    const consultaAPI = async () => {
        const consulta = await clienteAxios.get('/productos/'+id);
        //console.log('consulta: ', consulta.data)
        //colocar  resultado en el state
        datosProducto(consulta.data); 
    }

    //Query a la API Avtualizar
    const handleSubmit =  e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('nombre', producto.nombre);
        formData.append('precio', producto.precio);
        formData.append('imagen', archivo);
        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        //console.log('archivo :', archivo);
        clienteAxios.put('/productos/'+producto._id, formData, config)
            .then(res => {
                //console.log('res :', res);
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
        datosProducto({
            //Actualuzamos el state agregando una copia del State actual
            ...producto,
            [e.target.name]:e.target.value});
    }  
    
    const handleChangeFile = (e) => {
        //console.log('e.target.files[0] :', e.target.files[0]);
        guardarArchivo(e.target.files[0]);
    }   


    //user effect es similar a componetdidmont y willmount
    useEffect(() => {
        consultaAPI();
        /*return () => {
            cleanup
        }*/
    }, []);

    //Validar el formulario
    const validarProducto = () => {
        let valido= producto.nombre.length && producto.precio;
        return !valido;
    }


    //Spinner de Carga
    if(!producto.nombre.length) return <Spinner/>

    return (
        <Fragment>
            <h2>Editar Producto</h2>
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
                        defaultValue={producto.nombre}
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
                        defaultValue={producto.precio}
                        onChange={handleChange}
                    />
                </div>
                <div className="campo">
                    <label>Imagen:</label>
                    {producto.imagen ? <img  src={"http://localhost:8080/"+producto.imagen} alt={producto.nombre} /> :null }
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
                        value="Guardar Cambios"
                        disabled={validarProducto()}
                    />
                </div>
            </form>        
        </Fragment>
    );
};




export default withRouter(EditarProducto);