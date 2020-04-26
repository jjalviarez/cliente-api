import React, { useState, useEffect, Fragment } from 'react';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';
import FormBuscarProducto from './FormBuscarProducto';
import FormCantidadProducto from './FormCantidadProducto';

const NuevoPedido = props => {
    //Extraer ID de cliente 
    const {id}= props.match.params

        //Trabajar con el state
    // cliente = state, guardarCliente 0 funcion para guardar el state
    const [cliente, datosCliente] = useState({});
    const [busqueda, guardarBusqueda] = useState('');
    const [productos, guardarProducto] = useState([]);

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


    const buscarProducto = async e => {


        /*
        {
            "cliente": "5e7ec8736df66c329bbc1304",
            "pedido": [
                {
                    "producto": "5e80c9d0ebbb1d214c13ce10",
                    "cantidad": 3
                },
                {
                    "producto": "5e80ca0bebbb1d214c13ce13",
                    "cantidad": 1
                }
            ],
            "total": 2586
        }

        */
        e.preventDefault();
        //Obtener los productos de la busqueda  
        const busquedaProducto = await clienteAxios.get('/productos/busqueda/'+busqueda);
        if (busquedaProducto.data.length) {
            let productoResultado=busquedaProducto.data[0];
            //Agregar la llave a producto
            productoResultado.producto= productoResultado._id;
            productoResultado.cantidad=0;
            //Agregar al State
            guardarProducto([...productos, productoResultado]);



        }
        else {
            Swal.fire({
                icon: 'info',
                title: 'No hay resultado'
            })
        }


    }
    
    //Almacena la busqyeda en el State
    const leerDatosBusqueda = e => {
        guardarBusqueda(e.target.value)
    }
    


    return (
        <Fragment>
            <h2>Nuevo Pedido</h2>
            <div className="ficha-cliente">
                <h3>Datos de Cliente</h3>
                <p>{`${cliente.nombre} ${cliente.apellido}`}</p>
                <p>{cliente.telefono}</p>
            </div>
            <FormBuscarProducto
                buscarProducto={buscarProducto}
                leerDatosBusqueda={leerDatosBusqueda}
            />
            <form>
                <legend>Busca un Producto y agrega una cantidad</legend>
                <div className="campo">
                <label>Productos:</label>
                <input type="text" placeholder="Nombre Productos" name="productos" />
                </div>
                <ul className="resumen">
                    {productos.map((producto,index) => (
                        <FormCantidadProducto
                            key={producto.producto}
                            producto={producto}
                        />
                    ))}
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



export default withRouter(NuevoPedido);