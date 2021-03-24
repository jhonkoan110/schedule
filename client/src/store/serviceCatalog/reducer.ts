import {
    SERVICE_CATALOG_FETCHED,
    SERVICE_CATALOG_FETCHED_ERR,
    SERVICE_CATALOG_FETCHING,
} from './actionTypes';
import { InitialStateType, IServiceCatalog } from './types';

const initialState: InitialStateType = {
    serviceCatalog: [],
    error: null,
    isLoading: false,
};

const serviceCatalogReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SERVICE_CATALOG_FETCHING: {
            return { ...state, isLoading: action.payload };
        }

        case SERVICE_CATALOG_FETCHED: {
            return { ...state, serviceCatalog: action.payload };
        }

        case SERVICE_CATALOG_FETCHED_ERR: {
            return { ...state, error: action.payload };
        }

        default:
            return state;
    }
};

export default serviceCatalogReducer;