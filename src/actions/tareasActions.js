import { TRAER_TAREAS, CARGANDO, ERROR, CAMBIAR_ID, CAMBIAR_TITULO, GUARDAR, ACTUALIZAR, LIMPIAR } from '../type/tareasTypes';
import axios from "axios";

export const traerTodos = () => async (dispatch) => {
    dispatch({
        type: CARGANDO
    });
    try {
        const respuesta = await axios.get('https://jsonplaceholder.typicode.com/todos');

        const tareas = {};
        respuesta.data.map((tar) => (
            tareas[tar.userId] = {
                ...tareas[tar.userId],
                [tar.id]: {
                    ...tar
                }
            }
        ));

        dispatch({
            type: TRAER_TAREAS,
            payload: tareas
        });
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: 'Informacion de Usuario no disponible'
        });
    }
}

export const cambioUsuarioId = (usuario_id) => (dispatch) => {
    dispatch({
        type: CAMBIAR_ID,
        payload: usuario_id
    })
}

export const cambioTitulo = (usuario_titulo) => (dispatch) => {
    dispatch({
        type: CAMBIAR_TITULO,
        payload: usuario_titulo
    })
}

export const agregar = (nueva_tarea) => async (dispatch) => {
    dispatch({
        type: CARGANDO
    })

    try {
        const respuesta = await axios.post('https://jsonplaceholder.typicode.com/todos', nueva_tarea);
        // console.log(respuesta.data);
        dispatch({
            type: GUARDAR
        })
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: 'Intente mas tarde'
        })
    }
}

export const editar = (tarea_editada) => async (dispatch) => {
    dispatch({
        type: CARGANDO
    })

    try {
        const respuesta = await axios.put(`https://jsonplaceholder.typicode.com/todos/${tarea_editada.id}`, tarea_editada);
        // console.log(respuesta.data);
        dispatch({
            type: GUARDAR
        })
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: 'Intente mas tarde'
        })
    }
}

export const cambioCheck = (usu_id, tar_id) => (dispatch, getState) => {
    const { tareas } = getState().tareasReducer;
    const seleccionada = tareas[usu_id][tar_id];

    const actualizadas = {
        ...tareas
    };
    actualizadas[usu_id] = {
        ...tareas[usu_id]
    }
    actualizadas[usu_id][tar_id] = {
        ...tareas[usu_id][tar_id],
        completed: !seleccionada.completed
    }

    dispatch({
        type: ACTUALIZAR,
        payload: actualizadas
    })
};

export const eliminar = (tar_id) => async (dispatch) => {
    dispatch({
        type: CARGANDO
    })

    try {
        const respuesta = await axios.delete(`https://jsonplaceholder.typicode.com/todos/${tar_id}`);
        // console.log(respuesta.data);
        dispatch({
            type: TRAER_TAREAS,
            payload: {}
        })
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: 'Servicio no Disponible'
        })
    }
};

export const limpiarForma = () => (dispatch) => {
    dispatch({
        type: LIMPIAR
    })
}