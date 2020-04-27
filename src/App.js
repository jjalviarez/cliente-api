import React, {Fragment} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';



/***** Hayout */
import Header from "./components/layout/Header";
import Navegacion from "./components/layout/Navegacion";
import Clientes from "./components/clientes/Clientes";
import Productos from './components/productos/Productos';
import Pedidos from './components/pedidos/Pedidos';
import NuevoCliente from './components/clientes/NuevoCliente';
import EditarCliente from './components/clientes/EditarCliente';
import NuevoProducto from './components/productos/NuevoProducto';
import EditarProducto from './components/productos/EditarProducto';
import NuevoPedido from './components/pedidos/NuevoPedido';
import EditarPedido from './components/pedidos/EditarPedido';

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
              <Route exact path='/clientes/nuevo' component={NuevoCliente} />
              <Route exact path='/clientes/editar/:id' component={EditarCliente} />
              <Route exact path='/productos' component={Productos} />
              <Route exact path='/productos/nuevo' component={NuevoProducto} />
              <Route exact path='/productos/editar/:id' component={EditarProducto} />
              <Route exact path='/pedidos' component={Pedidos} />
              <Route exact path='/pedidos/nuevo/:id' component={NuevoPedido} />
              <Route exact path='/pedidos/editar/:id' component={EditarPedido} />
            </Switch>
          </main>
        </div>
      </Fragment> 
    </Router> 
    )
}

export default App;
