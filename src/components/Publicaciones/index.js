import React from 'react';
import { connect } from 'react-redux';

import Spinner from '../general/Spinner';
import Fatal from '../general/Fatal';

import * as usuariosActions from '../../actions/usuariosActions';
import * as publicacionesActions from '../../actions/publicacionesActions';

const { traerTodos: usuariosTraerDatos } = usuariosActions;
const { traerPorUsuario: publicacionesTraerPorUsuario, abrirCerrar } = publicacionesActions;

class Publicaciones extends React.Component {
    
    async componentDidMount() {
        const {
            usuariosTraerDatos,
            publicacionesTraerPorUsuario,
            match: { params: { key } }
        } = this.props;
        if (!this.props.usuariosReducer.usuarios.length) {
            await usuariosTraerDatos();
        }
        if (this.props.usuariosReducer.error) {
            return;
        }
        if(!('publicaciones_key' in this.props.usuariosReducer.usuarios[key])){
            await publicacionesTraerPorUsuario( key );
        }
    }

    ponerUsuario = () => {
        const {
            usuariosReducer,
            match: { params: { key } }
        } = this.props;

        if(usuariosReducer.error){
            return <Fatal mensaje={ usuariosReducer.error }/>;
        }

        if(!usuariosReducer.usuarios.length || usuariosReducer.cargando){
            return <Spinner/>;
        }

        const nombre = usuariosReducer.usuarios[key].name;

        return (
            <h1 className='publicaciones_main-title'>
                Publicaciones { nombre }
            </h1>
        )
    }

    ponerPublicaciones = () => {
        const {
            usuariosReducer,
            usuariosReducer: { usuarios },
            publicacionesReducer,
            publicacionesReducer: { publicaciones },
            match: { params: { key } }
        } = this.props;

        if(!usuarios.length) return;
        if(usuariosReducer.error) return;

        if(publicacionesReducer.cargando){
            return <Spinner/>
        }

        if(publicacionesReducer.error){
            return <Fatal mensaje={publicacionesReducer.error}/>
        }

        if(!publicaciones.length) return;
        if(!('publicaciones_key' in usuarios[key])) return;

        const { publicaciones_key } = usuarios[key];

        return this.mostrarInfo(
            publicaciones[publicaciones_key],
            publicaciones_key
        );
    }

    mostrarInfo = ( publicaciones, pub_key) => (
        publicaciones.map((publicacion, com_key) => (
            <div 
                className='publicaciones_container'
                key={ publicacion.id }
                onClick={ () => this.props.abrirCerrar (pub_key, com_key) }
            >
                <h2 className='publicaciones_titulo'>
                    { publicacion.title}
                </h2>
                <h3 className='publicaciones_description'>
                    { publicacion.body}
                </h3>
            </div>
        ))
    );

    render(){
        console.log(this.props);
        return(
            <div className='publicaciones'>
                { this.ponerUsuario() }
                { this.ponerPublicaciones() }
            </div>
        )
    }
}

const mapStateToProps = ({ usuariosReducer, publicacionesReducer }) => {
    return {
        usuariosReducer, 
        publicacionesReducer
    };
};

const mapDispatchToProps = {
    usuariosTraerDatos,
    publicacionesTraerPorUsuario,
    abrirCerrar
}

export default connect(mapStateToProps, mapDispatchToProps)(Publicaciones);