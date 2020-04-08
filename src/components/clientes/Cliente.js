import React /*, { useState, useEffect } */ from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';




const Cliente = ({cliente}) => {
    const  {_id,nombre, apellido, empresa, email,telefono } = cliente;


    //Query a la API Eliminar
    const handleClick =  id => {
        Swal.fire({
            title: 'Quieres Eliminar el Cliente',
            text: "Esto no se puede revertir!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                clienteAxios.delete('/clientes/'+id)
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
        <li className="cliente">
            <div className="info-cliente">
                <p className="nombre">{nombre} {apellido}</p>
                <p className="empresa">{empresa}</p>
                <p>{email}</p>
                <p>Tlf: {telefono}</p>
            </div>
            <div className="acciones">
                <Link to={"/clientes/editar/"+_id} className="btn btn-azul">
                    <i className="fas fa-pen-alt" />
                    Editar Cliente
                </Link>
                <button 
                    type="button" 
                    className="btn btn-rojo btn-eliminar"
                        name="nombre" 
                        onClick={() => handleClick(_id)}
                >
                    <i className="fas fa-times" />
                    Eliminar Cliente
                </button>
            </div>
        </li>
    );
};

export default Cliente;