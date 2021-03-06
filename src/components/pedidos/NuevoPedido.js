import React, { useState, useEffect, useContext, Fragment } from 'react';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';
import FormBuscarProducto from './FormBuscarProducto';
import FormCantidadProducto from './FormCantidadProducto';
//Importar el context 
import { CRMContext } from '../../context/CRMContext';

const NuevoPedido = props => {
    //Extraer ID de cliente 
    const {id}= props.match.params

        //Trabajar con el state
    // cliente = state, guardarCliente 0 funcion para guardar el state
    const [cliente, datosCliente] = useState({});
    const [busqueda, guardarBusqueda] = useState('');
    const [productos, guardarProducto] = useState([]);
    const [total, guardarTotal] = useState(0);
    const [auth, guardarAuth] = useContext(CRMContext);

    useEffect(() => {

        const consultaAPI = async () => {
            if(auth.token !== '' && auth.auth) {
                try {
                    const consulta = await clienteAxios.get('/clientes/'+id,{
                        headers: {
                        'Authorization': `Bearer ${auth.token}`
                        }
                    });
                    //console.log('consulta: ', consulta.data)
                    //colocar  resultado en el state
                    datosCliente(consulta.data); 
                } catch (err) {
                    if (err.response.sratus === 500)  props.history.push('/login');
    
                }
            }
            else {
                props.history.push('/login');
            }
        }

        const actualizarTotal = () => {
            let nuevoTotal = 0;
            productos.map(producto => nuevoTotal+= (producto.cantidad*producto.precio));
            guardarTotal(nuevoTotal);
        }
        
        consultaAPI();

        actualizarTotal();


    }, [productos]);


    const buscarProducto = async e => {

        if(auth.token !== '' && auth.auth) {

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
            if (!busqueda.length) return;
            try {
                const busquedaProducto = await clienteAxios.get('/productos/busqueda/'+busqueda,{
                    headers: {
                    'Authorization': `Bearer ${auth.token}`
                    }
                });
                if (busquedaProducto.data.length) {
                    let productoResultado=busquedaProducto.data[0];
                    if (productos.some(producto => producto.producto === productoResultado._id)) {
                        Swal.fire({
                            icon: 'info',
                            title: 'El producto ya se encuenta en la lista'
                        })
                    }
                    else { 
                        //Agregar la llave a producto
                        productoResultado.producto= productoResultado._id;
                        productoResultado.cantidad=0;
                        //Agregar al State
                        guardarProducto([...productos, productoResultado]);
                    }
                }
                else {
                    Swal.fire({
                        icon: 'info',
                        title: 'El producto no encontrado'
                    })
                }
            } catch (err) {
                if (err.response.sratus === 500)  props.history.push('/login');
                
            }


        }
        else {
            props.history.push('/login');
        }

    }
    
    //Almacena la busqyeda en el State
    const leerDatosBusqueda = e => {
        guardarBusqueda(e.target.value)
    }
    const restarProducro = index => {
        if (productos[index].cantidad>0) {
            const listaProductos = [...productos];
            listaProductos[index].cantidad--;
            guardarProducto(listaProductos);
        }

    }
    
    const sumarProducto = index => {
        const listaProductos = [...productos];
        listaProductos[index].cantidad++;
        guardarProducto(listaProductos);
    }    
    const eliminarProducto = index => {

        const listaProductos = [...productos];
        listaProductos.splice(index, 1)
        guardarProducto(listaProductos);
    }


    //Query a la API Nuevo Pedido
    const handleSubmit =  e => {
        e.preventDefault();
        if(auth.token !== '' && auth.auth) {
            const pedido= {};
            pedido.cliente=id;
            pedido.pedido= productos;
            pedido.total=total;
            clienteAxios.post('/pedidos', pedido,{
                headers: {
                'Authorization': `Bearer ${auth.token}`
                }
            })
            .then(res => {
                console.log('res :', res);
                Swal.fire(
                    'Pedido creado correctamente!',
                    'You clicked the button!',
                    'success'
                )
                //redireccionar 
                props.history.push('/pedidos');
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                });
                if(err.response.sratus === 500)  history.push('/login');
            })
        }
        else {
            history.push('/login');
        }
    }   
        
    if(!auth.auth) history.push('/login');

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
            <ul className="resumen">
                {productos.map((producto,index) => (
                    <FormCantidadProducto
                        key={producto.producto}
                        index={index}
                        producto={producto}
                        restarProducro={restarProducro}
                        sumarProducto={sumarProducto}
                        eliminarProducto={eliminarProducto}
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
                value={total}
            />
            </div>
            { total>0 ? (
                <form
                    onSubmit={handleSubmit}
                >
                    <div className="enviar">
                    <input
                        type="submit"
                        className="btn btn-azul"
                        value="Agregar Pedido"
                    />
                    </div>
                </form>
            ) : null
            }
        </Fragment>
    );
};



export default withRouter(NuevoPedido);