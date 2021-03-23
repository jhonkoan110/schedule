import {
    LOCATION_TYPES_FETCHED,
    LOCATION_TYPES_FETCHED_ERR,
    LOCATION_TYPES_FETCHING,
} from './actionTypes';
import { ILocationTypes, IInitialState } from './types';

const initialState = {
    locationTypes: [] as ILocationTypes[],
    error: null,
    isLoading: false,
};

const locationTypesReducer = (state: IInitialState = initialState, action: any) => {
    switch (action.type) {
        case LOCATION_TYPES_FETCHING: {
            return { ...state, isLoading: action.payload };
        }

        case LOCATION_TYPES_FETCHED: {
            return { ...state, locationTypes: action.payload };
        }

        case LOCATION_TYPES_FETCHED_ERR: {
            return { ...state, error: action.payload };
        }

        default:
            return state;
    }
};

export default locationTypesReducer;