import {
    SPECIALIZATIONS_FETCHED,
    SPECIALIZATIONS_FETCHED_ERR,
    SPECIALIZATIONS_FETCHING,
} from './actionTypes';
import { ISpecialization } from './types';

interface IInitialState {
    specializations: ISpecialization[];
    error: null | string;
    isLoading: boolean;
}


const initialState: IInitialState = {
    specializations: [],
    error: null,
    isLoading: false,
};

const specializationsReducer = (
    state: IInitialState = initialState,
    action: any
): IInitialState => {
    switch (action.type) {
        case SPECIALIZATIONS_FETCHING: {
            return { ...state, isLoading: action.payload };
        }

        case SPECIALIZATIONS_FETCHED: {
            return { ...state, specializations: action.payload };
        }

        case SPECIALIZATIONS_FETCHED_ERR: {
            return { ...state, error: action.payload };
        }

        default:
            return state;
    }
};

export default specializationsReducer;
