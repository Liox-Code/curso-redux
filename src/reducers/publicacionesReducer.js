import { ACTUALIZAR, CARGANDO, ERROR, COM_ACTUALIZAR, COM_CARGANDO, COM_ERROR } from '../type/publicacionesTypes';

const INITIAL_STATE = {
    publicaciones: [],
    cargando: false,
    error: '',
    com_cargando: false,
    com_error: ''
};

const publicacionesReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ACTUALIZAR:
            return {
                ...state,
                publicaciones: action.payload,
                cargando: false,
                error: ''
        };
        case CARGANDO:
            return {
                ...state,
                cargando: true
            };
        case ERROR:
            return {
                ...state,
                cargando: false,
                error: action.payload
            };
            case COM_ACTUALIZAR:
                return {
                    ...state,
                    publicaciones: action.payload,
                    com_cargando: false,
                    com_error: ''
            };
        case COM_CARGANDO:
            return {
                ...state,
                com_cargando: true
            };
        case COM_ERROR:
            return {
                ...state,
                com_cargando: false,
                com_error: action.payload
            };
        default: return state;
    }
}

export default publicacionesReducer;