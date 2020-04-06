import React /*, { useState, useEffect } */ from 'react';
import { Link } from 'react-router-dom';

const Cliente = ({cliente}) => {
    const  {_id,nombre, apellido, empresa, email,telefono } = cliente;
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
                <button type="button" className="btn btn-rojo btn-eliminar">
                    <i className="fas fa-times" />
                    Eliminar Cliente
                </button>
            </div>
        </li>
    );
};

export default Cliente;