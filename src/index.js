import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';

import reducers from './reducers/index';
import './css/index.css';
import './css/spinner.css';
import './css/iconos.css';
import './css/publicaciones.css';
import './css/comentarios.css';
import './css/tareas.css';

const store = createStore(
  reducers,
  {},
  applyMiddleware(reduxThunk)
);

ReactDOM.render(
  <Provider store = { store  }>
    <App/>
  </Provider>,
  document.getElementById('root')
);
