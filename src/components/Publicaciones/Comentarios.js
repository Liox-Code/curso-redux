import React from 'react';
import Spinner from '../general/Spinner';
import Fatal from '../general/Fatal';

import { connect } from 'react-redux';

class Comentarios extends React.Component {

    ponerComentarios = () => {
        return(
            this.props.comentarios.map( (comentario) => (
                <li className='comentary-item'>
                    <b className='comentary-title'>
                            {comentario.email}
                    </b>
                    <p className='comentary-description'>
                        { comentario.body }
                    </p>
                </li>
            ))
        )
    }

    render(){
        if(this.props.com_error){
            return <Fatal mensaje={ this.props.com_error }/>;
        }
        if(this.props.com_cargando && !this.props.comentarios.length){
            return <Spinner/>;
        }

        return(
            <ul className='comentary-container'>
                { this.ponerComentarios() }
            </ul>
        );
    }
};

const mapStateToProps = ({ publicacionesReducer }) => {
    return(
        publicacionesReducer
    )
}

export default connect(mapStateToProps)(Comentarios);