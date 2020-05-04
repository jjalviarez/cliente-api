import React, { useState, useContext  } from 'react';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';

//Contexy
import { CRMContext } from '../../context/CRMContext';



const Login = (props) => {


  //Utilizar Contex en el Componente
  const [auth, guardarAuth] = useContext(CRMContext);

    const [login, datosLogin] = useState({
        email:'',
        password:''
    });

    const handleChange = (e) => {
        datosLogin({
            //Actualuzamos el state agregando una copia del State actual
            ...login,
            [e.target.name]:e.target.value});
    }

    //Query a la API Login
    const handleSubmit =  e => {
        e.preventDefault();
        clienteAxios.post('/login',login)
            .then(res => {
                //console.log('res :', res);
                localStorage.setItem('token', res.data);
                guardarAuth({
                    token: res.data,
                    auth:true
                })
                Swal.fire({
                    title: 'Login Correcto',
                    icon: 'success'
                })
                //redireccionar 
                props.history.push('/');
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'usuario o contraseña incorrectos',
                })
            })
        
    }

    
    return (
        <div className='login'>
            <h2>Login</h2>
            <div className='contenedor-formulario'>
                <form onSubmit={handleSubmit} >
                    <div className='campo'>
                        <label>Email</label>
                        <input
                            type='text'
                            name='email'
                            placeholder='email'
                            required
                            onChange={handleChange}
                        />
                    </div>
                    <div className='campo'>
                        <label>Password</label>
                        <input
                            type='password'
                            name='password'
                            placeholder='password'
                            required
                            onChange={handleChange}
                        />
                    </div>
                    <div className="enviar">
                        <input
                            type="submit" 
                            className="btn btn-azul" 
                            defaultValue="Login" 
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default withRouter(Login);