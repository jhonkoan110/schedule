import {
    MASTERS_FETCHED,
    MASTERS_FETCHED_ERR,
    MASTERS_FETCHING,
} from './actionTypes';
import { MastersInitialState } from './types';

const initialState: MastersInitialState = {
    masters: [],
    error: null,
    isLoading: false,
};

const mastersReducer = (
    state = initialState,
    action: any
): MastersInitialState => {
    switch (action.type) {
        case MASTERS_FETCHING: {
            return { ...state, isLoading: action.payload };
        }

        case MASTERS_FETCHED: {
            return { ...state, masters: action.payload };
        }

        case MASTERS_FETCHED_ERR: {
            return { ...state, error: action.payload };
        }

        default:
            return state;
    }
};

export default mastersReducer;
