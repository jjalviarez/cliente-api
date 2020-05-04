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
                <i 
                    className="fas fa-minus"
                    onClick={() => props.restarProducro(props.index)}
                />
                <p>{props.producto.cantidad}</p>
                <i 
                    className="fas fa-plus"
                    onClick={() => props.sumarProducto(props.index)}
                />
            </div>
            <button 
                type="button" 
                className="btn btn-rojo"
                onClick={() => props.eliminarProducto(props.index)}                
            >
                <i className="fas fa-minus-circle" />
                Eliminar Producto
            </button>
            </div>
        </li>
    );
};

export default FormCantidadProducto;