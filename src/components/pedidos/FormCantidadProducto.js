import React from 'react';

const FormCantidadProducto = props => {
    return (
        <li>
            <div className="texto-producto">
            <p className="nombre">{props.producto.nombre}</p>
            <p className="precio">$ {props.producto.precio}</p>
            </div>
            <div className="acciones">
            <div className="contenedor-cantidad">
                <i className="fas fa-minus" />
                <p>{props.producto.cantidad}</p>
                <i className="fas fa-plus" />
            </div>
            <button type="button" className="btn btn-rojo">
                <i className="fas fa-minus-circle" />
                Eliminar Producto
            </button>
            </div>
        </li>
    );
};

export default FormCantidadProducto;