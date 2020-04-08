import React, { useState/*, useEffect*/, Fragment } from 'react';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';

const NuevoCliente = ({history}) => {

       //Trabajar con el state
    // cliente = state, guardarCliente 0 funcion para guardar el state
    const [cliente, gurardarCliente] = useState({
        nombre:'',
        apellido:'',
        empresa:'',
        email:'',
        telefono:''
    });

    //Query a la API
    const handleSubmit =  e => {
        e.preventDefault();
        clienteAxios.post('/clientes',cliente)
            .then(res => {
                console.log('res :', res);
                Swal.fire(
                    'Cleinte creado correctamente!',
                    'You clicked the button!',
                    'success'
                )
                //redireccionar 
                history.push('/');
            })
            .catch(
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                })
            )
        
    }

    const handleChange = (e) => {
        gurardarCliente({
            //Actualuzamos el state agregando una copia del State actual
            ...cliente,
            [e.target.name]:e.target.value});
    }

    //Validar el formulario
    const validarCliente = () => {
    let valido=true;
    Object.values(cliente).forEach((value) =>{
        valido = valido && value.length;
        //console.log('value :', value);
    });
    return !valido;

    }

/*

    //user effect es similar a componetdidmont y willmount
    useEffect(() => {
        consultaAPI();
        return () => {
            cleanup
        }
    }, []);
*/
    
    return (
        <Fragment>  
            <h2>Nuevo CLiente</h2>
            <form 
                onSubmit={handleSubmit}
            >
                <legend>Llena todos los campos</legend>
                <div className="campo">
                    <label>Nombre:</label>
                    <input
                        type="text" 
                        placeholder="Nombre Cliente" 
                        name="nombre" 
                        onChange={handleChange}
                        />
                </div>
                <div className="campo">
                    <label>Apellido:</label>
                    <input
                        type="text" 
                        placeholder="Apellido Cliente" 
                        name="apellido" 
                        onChange={handleChange}
                        />
                </div>
                <div className="campo">
                    <label>Empresa:</label>
                    <input
                        type="text" 
                        placeholder="Empresa Cliente" 
                        name="empresa" 
                        onChange={handleChange}
                    />
                </div>
                <div className="campo">
                    <label>Email:</label>
                    <input
                        type="email" 
                        placeholder="Email Cliente" 
                        name="email" 
                        onChange={handleChange}
                    />
                </div>
                <div className="campo">
                    <label>Teléfono:</label>
                    <input type="text" 
                    placeholder="Teléfono Cliente" 
                    name="telefono" 
                    onChange={handleChange}
                    />
                </div>
                <div className="enviar">
                    <input
                        type="submit" 
                        className="btn btn-azul" 
                        defaultValue="Agregar Cliente" 
                        disabled={validarCliente()}
                    />
                </div>
            </form>
        </Fragment>
    );
};


// HOC (withRouter) toma un componente y tetorna unn nuevo componente 
export default withRouter(NuevoCliente);