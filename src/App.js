import React, {Fragment} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';



/***** Hayout */
import Header from "./components/layout/Header";
import Navegacion from "./components/layout/Navegacion";
import Clientes from "./components/clientes/Clientes";
import Productos from './components/productos/Productos';
import Pedidos from './components/pedidos/Pedidos';

const App = () => {
  return (
    
    <Router> 
      <Fragment> 
        <Header />
        <div className="grid contenedor contenido-principal">
          <Navegacion /> 
          <main className="caja-contenido col-9">
            <Switch>
              <Route exact path='/' component={Clientes} />
              <Route exact path='/productos' component={Productos} />
              <Route exact path='/pedidos' component={Pedidos} />
            </Switch>
          </main>
        </div>
      </Fragment> 
    </Router> 
    )
}

export default App;
