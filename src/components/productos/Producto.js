import React /*, { useState, useEffect } */ from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';


const Producto = ({producto}) => {
    console.log('producto :', producto);
    const {_id,nombre, precio, imagen} = producto;

    //Query a la API Eliminar
    const handleClick =  id => {
        Swal.fire({
            title: 'Quieres Eliminar el Prodcuto',
            text: "Esto no se puede revertir!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                clienteAxios.delete('/productos/'+id)
                .then(res => {
                    //console.log('res :', res);
                    Swal.fire(
                        res.data,
                        'You clicked the button!',
                        'success'
                    )
                })
                .catch(
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                    })
                )
            }
        })     
    }




    return (
    <li className="producto">
        <div className="info-producto">
            <p className="nombre">{nombre}</p>
            <p className="precio">${precio} </p>
            <img src={"http://localhost:8080/"+imagen} />
        </div>
        <div className="acciones">
            <Link to={"/productos/editar/"+_id} className="btn btn-azul">
                <i className="fas fa-pen-alt" />
                Editar Producto
            </Link>
            <button 
                type="button" 
                className="btn btn-rojo btn-eliminar"
                onClick={() => handleClick(_id)}
            >
                <i className="fas fa-times" />
                Eliminar Cliente
            </button>
        </div>
    </li>
    );
};


export default Producto;