import React /*, { useState, useEffect } */ from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';


const Pedido = ({pedido}) => {


    //Query a la API Eliminar
    const handleClick =  id => {
        Swal.fire({
            title: 'Quieres Eliminar el Pedido',
            text: "Esto no se puede revertir!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                clienteAxios.delete('/pedidos/'+id)
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
        <li className="pedido">
            <div className="info-pedido">
                <p className="id">ID: {pedido._id}</p>
                <p className="nombre">{`${pedido.cliente.nombre} ${pedido.cliente.apellido}`}</p>
                <div className="articulos-pedido">
                    <p className="productos">Artículos Pedido: </p>
                    <ul>
                        {pedido.pedido.map((articulo) => (
                            <li key={pedido._id+articulo.producto._id}>
                                <p>{articulo.producto.nombre}</p>
                                <p>Precio: $ {articulo.producto.precio}</p>
                                <p>Cantidad: {articulo.cantidad}</p>
                            </li>
                        ))}
                    </ul>
                </div>
                <p className="total">Total: $ {pedido.total} </p>
            </div>
            <div className="acciones">
                <Link to={"/pedidos/editar/"+pedido._id} className="btn btn-azul">
                    <i className="fas fa-pen-alt" />
                    Editar Pedido
                </Link>
                <button 
                    type="button" 
                    className="btn btn-rojo btn-eliminar"
                    onClick={() => handleClick(pedido._id)}
                >
                    <i className="fas fa-times" />
                    Eliminar Pedido
                </button>
            </div>
        </li>
    );
};

export default Pedido;