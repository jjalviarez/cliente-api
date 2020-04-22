import React, { useState, useEffect, Fragment } from 'react';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';

const NuevoPedido = props => {
    //Extraer ID de cliente 
    const {id}= props.match.params

        //Trabajar con el state
    // cliente = state, guardarCliente 0 funcion para guardar el state
    const [cliente, datosCliente] = useState({
        nombre:'',
        apellido:'',
        empresa:'',
        email:'',
        telefono:''
    });

    useEffect(() => {

        const consultaAPI = async () => {
            const consulta = await clienteAxios.get('/clientes/'+id);
            //console.log('consulta: ', consulta.data)
            //colocar  resultado en el state
            datosCliente(consulta.data); 
        }


        consultaAPI();
        /*return () => {
            cleanup
        }*/
    }, []);


    return (
        <Fragment>
            <h2>Nuevo Pedido</h2>
            <div className="ficha-cliente">
                <h3>Datos de Cliente</h3>
                <p>{`${cliente.nombre} ${cliente.apellido}`}</p>
                <p>{cliente.telefono}</p>
            </div>
            <form>
                <legend>Busca un Producto y agrega una cantidad</legend>
                <div className="campo">
                <label>Productos:</label>
                <input type="text" placeholder="Nombre Productos" name="productos" />
                </div>
                <ul className="resumen">
                <li>
                    <div className="texto-producto">
                    <p className="nombre">Macbook Pro</p>
                    <p className="precio">$250</p>
                    </div>
                    <div className="acciones">
                    <div className="contenedor-cantidad">
                        <i className="fas fa-minus" />
                        <input type="text" name="cantidad" />
                        <i className="fas fa-plus" />
                    </div>
                    <button type="button" className="btn btn-rojo">
                        <i className="fas fa-minus-circle" />
                        Eliminar Producto
                    </button>
                    </div>
                </li>
                <li>
                    <div className="texto-producto">
                    <p className="nombre">Macbook Pro</p>
                    <p className="precio">$250</p>
                    </div>
                    <div className="acciones">
                    <div className="contenedor-cantidad">
                        <i className="fas fa-minus" />
                        <input type="text" name="cantidad" />
                        <i className="fas fa-plus" />
                    </div>
                    <button type="button" className="btn btn-rojo">
                        <i className="fas fa-minus-circle" />
                        Eliminar Producto
                    </button>
                    </div>
                </li>
                <li>
                    <div className="texto-producto">
                    <p className="nombre">Macbook Pro</p>
                    <p className="precio">$250</p>
                    </div>
                    <div className="acciones">
                    <div className="contenedor-cantidad">
                        <i className="fas fa-minus" />
                        <input type="text" name="cantidad" />
                        <i className="fas fa-plus" />
                    </div>
                    <button type="button" className="btn btn-rojo">
                        <i className="fas fa-minus-circle" />
                        Eliminar Producto
                    </button>
                    </div>
                </li>
                </ul>
                <div className="campo">
                <label>Total:</label>
                <input
                    type="number"
                    name="precio"
                    placeholder="Precio"
                    readOnly="readonly"
                />
                </div>
                <div className="enviar">
                <input
                    type="submit"
                    className="btn btn-azul"
                    value="Agregar Pedido"
                />
                </div>
            </form>


        </Fragment>
    );
};



export default NuevoPedido;