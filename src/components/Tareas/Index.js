import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../general/Spinner';
import Fatal from '../general/Fatal';

import * as tareasActions from '../../actions/tareasActions';

class Tareas extends React.Component{

    componentDidMount(){
        if(!Object.keys(this.props.tareas).length){
            this.props.traerTodos();
        }
    }

    componentDidUpdate(){
        const { tareas, cargando, traerTodos } = this.props;
        
        if(!Object.keys(tareas).length && !cargando){
            traerTodos();
            console.log(this.props);
        }
    }
    
    mostrarContenido(){
        const { tareas, cargando, error } = this.props;
    
        if(cargando){
            return <Spinner/>
        }

        if(error){
            return <Fatal mensaje={ error }/>
        }
    
        return Object.keys(tareas).map((usu_id) => (
            <div key={usu_id} className='tareas'>
                <h2 className='tareas-title'> Usuario {usu_id}</h2>
                <div className='tareas-container'>
                    { this.ponerTareas(usu_id) }
                </div>
            </div>
        ))
    }

    ponerTareas = (usu_id) =>{
        const { tareas, cambioCheck, eliminar } = this.props;
        const por_usuario = {
            ...tareas[usu_id]
        };

        return Object.keys(por_usuario).map((tar_id) => (
            <div className='tareas-row'>
                <input
                    type='checkbox' 
                    defaultChecked={ por_usuario[tar_id].completed } 
                    className='tareas-checkbox'
                    onChange={ () => cambioCheck(usu_id ,tar_id) }
                />
                <span className='tareas-description'>
                    { por_usuario[tar_id].title }
                </span>
                <Link to={`/Tareas/Guardar/${usu_id}/${tar_id}`}>
                    <button>
                        Editar
                    </button>
                </Link>
                <button onClick={ () => eliminar(tar_id) }>
                    Eliminar
                </button>
            </div>
        ))
    };

    render(){
        // console.log(this.props.tareas);
        return(
            <div className='tareas-page'>
                <h1 className='tareas-page-title'>Tareas</h1>
                <Link to='/Tareas/Guardar'>
                    <button>
                        Agregar
                    </button>
                </Link>
                { this.mostrarContenido()}
            </div>
        )
    }
}

const mapStateToProps = ({ tareasReducer }) => {
    return(
        tareasReducer
    )
}

const mapDispatchToProps = {
    ...tareasActions
}

export default connect(mapStateToProps, mapDispatchToProps)(Tareas);