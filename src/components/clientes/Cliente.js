import React, {useContext} from 'react';
import { Link, withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
//Importar el context 
import { CRMContext } from '../../context/CRMContext';



const Cliente = (props) => {
    const  {_id,nombre, apellido, empresa, email,telefono } = props.cliente;

    const [auth, guardarAuth] = useContext(CRMContext);

    //Query a la API Eliminar
    const handleClick =  id => {
        if(auth.token !== '' && auth.auth) {
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
                    clienteAxios.delete('/clientes/'+id,{
                        headers: {
                        'Authorization': `Bearer ${auth.token}`
                        }
                    })
                    .then(res => {
                        //console.log('res :', res);
                        Swal.fire(
                            res.data,
                            'You clicked the button!',
                            'success'
                        )
                    })
                    .catch(err => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Something went wrong!',
                        })
                        if(err.response.sratus === 500)  history.push('/login');

                    })
                }
            }) 
        }
        else {
            props.history.push('/login');
        }    
    }


    if(!auth.auth) props.history.push('/login');

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
                <Link to={"/pedidos/nuevo/"+_id} className="btn btn-amarillo">
                    <i className="fas fa-plus" /> 
                    Nuevo Pedido
                </Link>
                <button 
                    type="button" 
                    className="btn btn-rojo btn-eliminar"
                    onClick={() => handleClick(_id)}
                >
                    <i className="fas fa-times" />
                    Eliminar Cliente
                </button>
            </div>
        </li>
    );
};

export default withRouter(Cliente);