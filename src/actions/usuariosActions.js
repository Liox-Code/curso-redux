import { TRAER_USUARIOS, CARGANDO, ERROR } from '../type/usuariosTypes';
import axios from "axios";

export const traerTodos = () => async (dispatch) => {
    dispatch({
        type: CARGANDO
    });
    try {
        const respuesta = await axios.get('https://jsonplaceholder.typicode.com/users');
        dispatch({
            type: TRAER_USUARIOS,
            payload: respuesta.data
        });
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: 'Informacion de Usuario no disponible'
        });
    }
}