import React, { useContext } from 'react'

import { CRMContext } from '../../context/CRMContext';
import { withRouter } from 'react-router-dom';


const Header = props => {


    const [auth, guardarAuth] = useContext(CRMContext);


    const handleClick =  () => {
        guardarAuth({
            token: '',
            auth:false
        })
        localStorage.removeItem('token');
        props.history.push('/login');

    }


    return (
        <header className="barra">
            <div className="contenedor">
                <div className="contenido-barra">
                    <h1>CRM - Administrador de Clientes</h1>
                    { 
                        auth.auth ? (
                            <button
                                type="button"
                                className="btn btn-rojo"
                                onClick={() => handleClick()}
                            >
                                <i className="fas fa-times-circle"></i>
                                Logout
                            </button>

                        ): null
                    }
                    
                </div>
                
            </div>
        </header>
    );
};

export default withRouter(Header);


