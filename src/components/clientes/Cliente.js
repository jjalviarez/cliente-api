import React /*, { useState, useEffect } */ from 'react';

const Cliente = ({cliente}) => {
    const  {/*_id, */nombre, apellido, empresa, email,telefono } = cliente;
    return (
        <li className="cliente">
            <div className="info-cliente">
                <p className="nombre">{nombre} {apellido}</p>
                <p className="empresa">{empresa}</p>
                <p>{email}</p>
                <p>Tlf: {telefono}</p>
            </div>
            <div className="acciones">
                <a href="#" className="btn btn-azul">
                    <i className="fas fa-pen-alt" />
                    Editar Cliente
                </a>
                <button type="button" className="btn btn-rojo btn-eliminar">
                    <i className="fas fa-times" />
                    Eliminar Cliente
                </button>
            </div>
        </li>
    );
};

export default Cliente;