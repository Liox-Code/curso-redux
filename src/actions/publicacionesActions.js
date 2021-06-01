import { TRAER_PUBLICACIONES, CARGANDO, ERROR } from '../type/publicacionesTypes';
import { TRAER_USUARIOS } from '../type/usuariosTypes';
import axios from 'axios';

export const traerTodos = () => async (dispatch) => {
    dispatch({
        type: CARGANDO
    });
    try {
        const respuesta = await axios.get('https://jsonplaceholder.typicode.com/posts');
        dispatch({
            type: TRAER_PUBLICACIONES,
            payload: respuesta.data
        })
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: error.message
        });
    }
}

export const traerPorUsuario = (key) => async (dispatch, getState) => {
    const { usuarios } = getState().usuariosReducer;
    const { publicaciones } = getState().publicacionesReducer;
    const usuario_id = usuarios[key].id;
    
    dispatch({
        type: CARGANDO
    });
    
    try {
        const respuesta = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${usuario_id}`);

        const nuevas = respuesta.data.map((publicacion) => ({
            ...publicacion,
            comentarios: [],
            abierto: false
        }));

        const publicaciones_actualizadas = [
            ...publicaciones,
            nuevas
        ];

        dispatch({
            type: TRAER_PUBLICACIONES,
            payload: publicaciones_actualizadas
        })

        const publicaciones_key = publicaciones_actualizadas.length - 1;
        const usuarios_actualizados = [...usuarios];
        usuarios_actualizados[key] = {
            ...usuarios[key],
            publicaciones_key
        }
        
        dispatch({
            type: TRAER_USUARIOS,
            payload: usuarios_actualizados
        })
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: 'No se encontraron las publicaciones'
        });
    }
}

export const abrirCerrar = (pub_key, com_key) => (dispatch) => {
    console.log(`${pub_key} ${com_key}`);
}