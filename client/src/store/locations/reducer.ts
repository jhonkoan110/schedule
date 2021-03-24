import {
    LOCATIONS_FETCHED,
    LOCATIONS_FETCHED_ERR,
    LOCATIONS_FETCHING,
} from './actionTypes';

const initialState = {
    locations: [],
    error: null,
    isLoading: false,
};

const locationsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case LOCATIONS_FETCHING: {
            return { ...state, isLoading: action.payload };
        }

        case LOCATIONS_FETCHED: {
            return { ...state, locations: action.payload };
        }
        case LOCATIONS_FETCHED_ERR: {
            return { ...state, error: action.payload };
        }

        default:
            return state;
    }
};

export default locationsReducer;
