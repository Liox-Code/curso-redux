import { TRAER_TAREAS, CARGANDO, ERROR, CAMBIAR_ID, CAMBIAR_TITULO, GUARDAR, ACTUALIZAR, LIMPIAR } from '../type/tareasTypes';

const INITIAL_STATE = {
    tareas: [],
    cargando: false,
    error: '',
    usuario_id: '',
    titulo: '',
    regresar: false
};

const tareasReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TRAER_TAREAS:
            return {
                ...state,
                tareas: action.payload,
                cargando: false,
                error: '',
                regresar: false
            }
        case CARGANDO:
            return {
                ...state,
                cargando: true
            };
        case ERROR:
            return {
                ...state,
                error: action.payload,
                cargando: false
            };
        case CAMBIAR_ID:
            return {
                ...state,
                usuario_id: action.payload
            };
        case CAMBIAR_TITULO:
            return {
                ...state,
                titulo: action.payload
            };
        case GUARDAR:
            return {
                ...state,
                tareas: {},
                cargando: false,
                error: '',
                regresar: true,
                usuario_id: '',
                titulo: ''
            };
        case ACTUALIZAR:
            return{
                ...state,
                tareas: action.payload
            };
        case LIMPIAR:
            return{
                ...state,
                usuario_id: '',
                titulo: ''
            };
        default: return state;
    }
}

export default tareasReducer;