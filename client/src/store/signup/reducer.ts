import { SIGNUP_FETCHING, SIGNUP_FETCHED, SIGNUP_FETCHED_ERR } from './actionTypes';

interface InitialState {
    isLoading: boolean;
    error: null | string;
    response: any;
}

const initialState: InitialState = {
    isLoading: false,
    error: null,
    response: null,
};

const signupReducer = (state = initialState, action: any): InitialState => {
    switch (action.type) {
        case SIGNUP_FETCHING: {
            return { ...state, isLoading: action.payload };
        }

        case SIGNUP_FETCHED: {
            return { ...state, response: action.payload };
        }

        case SIGNUP_FETCHED_ERR: {
            return { ...state, error: action.payload };
        }

        default:
            return state;
    }
};

export default signupReducer;
