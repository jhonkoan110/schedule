import { AUTH_DATA_FETCHED, AUTH_DATA_FETCHING, AUTH_DATA_FETCHED_ERR } from './actionTypes';
interface InitialState {
    authData: any;
    isLoading: boolean;
    error: null | string;
}

const initialState: InitialState = {
    authData: null,
    isLoading: false,
    error: null,
};

const authReducer = (state = initialState, action: any): InitialState => {
    switch (action.type) {
        case AUTH_DATA_FETCHING: {
            return { ...state, isLoading: action.payload };
        }

        case AUTH_DATA_FETCHED: {
            return { ...state, authData: action.payload };
        }

        case AUTH_DATA_FETCHED_ERR: {
            return { ...state, error: action.payload };
        }

        default:
            return state;
    }
};

export default authReducer;
