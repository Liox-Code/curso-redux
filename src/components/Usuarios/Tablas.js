import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Tablas extends React.Component{
    
    // ponerFilas = () => {
    //   return (
    //     this.props.usuarios.map((usuario) => {
    //       return(
    //         <tr key={usuario.id}>
    //           <td>{usuario.name}</td>
    //           <td>{usuario.email}</td>
    //           <td>{usuario.website}</td>
    //         </tr>
    //       )
    //     })
    //   )
    // }
    render(){
        return(
            <table className='tabla'>
                <thead>
                    <tr>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Enlace</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    this.props.usuarios.map((usuario, key) => {
                        return(
                        <tr key={usuario.id}>
                            <td>{ usuario.name }</td>
                            <td>{ usuario.email }</td>
                            <td>{ usuario.website }</td>
                            <td>
                                <Link to={ `/Publicaciones/${key}` }>
                                    <div className="eye-solid2 icon"></div>
                                </Link>
                            </td>
                        </tr>
                        )
                    })
                    }
                </tbody>
            </table>
        )
    }
}

const mapStateProps = (reducers) => {
    return reducers.usuariosReducer;
};

export default connect(mapStateProps)(Tablas);