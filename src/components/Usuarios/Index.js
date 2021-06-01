import React from 'react';
import { connect } from 'react-redux';

import Tablas from './Tablas';
import Spinner from '../general/Spinner';
import Fatal from '../general/Fatal';

import * as usuariosActions from '../../actions/usuariosActions';

const { traerTodos: usuariosTraerDatos } = usuariosActions;

class Index extends React.Component{

  async componentDidMount(){
    if (!this.props.usuarios.length) {
        await this.props.usuariosTraerDatos();
    }
  }

  render(){

    if(this.props.cargando){
      return <Spinner></Spinner>;
    }

    if(this.props.error){
      return <Fatal mensaje={ this.props.error }></Fatal>;
    }

    return(
      <div className='center'>
        <h1>Usuarios</h1>
        <Tablas /*usuarios={ this.props.usuarios }*//>
      </div>
    )
  }
}

const mapStateProps = ({usuariosReducer}) => {
  return usuariosReducer;
}

const mapDispatchToProps = {
  usuariosTraerDatos
}

export default connect( mapStateProps, mapDispatchToProps)(Index);