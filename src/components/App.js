import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Menu from './Menu';
import Usuarios from './Usuarios/Index';
import Tareas from './Tareas/Index';
import Publicaciones from './Publicaciones/index';
import TareasGuardar from './Tareas/Guardar';

const App = () => {
    return(
        <BrowserRouter>
            <Menu/>
            <Switch>
                <Route exact path='/' component={ Usuarios } />
                <Route exact path='/Tareas' component={ Tareas } />
                <Route exact path='/Publicaciones/:key' component={ Publicaciones } />
                <Route exact path='/Tareas/Guardar' component={ TareasGuardar } />
                <Route exact path='/Tareas/Guardar/:usu_id/:tar_id' component={ TareasGuardar } />
            </Switch>
        </BrowserRouter>
    )
}

export default App;