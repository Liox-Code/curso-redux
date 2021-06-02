import { ACTUALIZAR, CARGANDO, ERROR, COM_ACTUALIZAR, COM_CARGANDO, COM_ERROR } from '../type/publicacionesTypes';
import { TRAER_USUARIOS } from '../type/usuariosTypes';
import axios from 'axios';

export const traerTodos = () => async (dispatch) => {
    dispatch({
        type: CARGANDO
    });
    try {
        const respuesta = await axios.get('https://jsonplaceholder.typicode.com/posts');
        dispatch({
            type: ACTUALIZAR,
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
            type: ACTUALIZAR,
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

export const abrirCerrar = (pub_key, com_key) => (dispatch, getState) => {
    const { publicaciones } = getState().publicacionesReducer;
    const seleccionada = publicaciones[pub_key][com_key];

    const actualizada = {
        ...seleccionada,
        abierto: !seleccionada.abierto,
    };

    const publicaciones_actualizadas = [ ...publicaciones ];
    publicaciones_actualizadas[pub_key] = [
        ...publicaciones[pub_key]
    ];

    publicaciones_actualizadas[pub_key][com_key] = actualizada;

    dispatch({
        type: ACTUALIZAR,
        payload: publicaciones_actualizadas
    })
}

export const traerComentarios = ( pub_key, com_key) => async ( dispatch, getState) => {
    dispatch({
        type: COM_CARGANDO
    });
    try {
        const { publicaciones } = getState().publicacionesReducer;
        const seleccionada = publicaciones[pub_key][com_key];
    
        const respuesta = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${seleccionada.id}`);
        const actualizada = {
            ...seleccionada,
            comentarios: respuesta.data
        };
    
        const publicaciones_actualizadas = [ ...publicaciones ];
        publicaciones_actualizadas[pub_key] = [
            ...publicaciones[pub_key]
        ];
    
        publicaciones_actualizadas[pub_key][com_key] = actualizada;
    
        dispatch({
            type: COM_ACTUALIZAR,
            payload: publicaciones_actualizadas
        })
    } catch (error) {
        dispatch({
            type: COM_ERROR,
            payload: 'No se encontraron los comentarios'
        });
    }
}