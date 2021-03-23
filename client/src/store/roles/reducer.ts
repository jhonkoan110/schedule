import {
    ROLES_FETCHED,
    ROLES_FETCHED_ERR,
    ROLES_FETCHING,
} from './actionTypes';
import { IInitialState, IRole } from './types';

const initialState: IInitialState = {
    error: null,
    isLoading: false,
    roles: [] as IRole[],
};

const rolesReducer = (
    state: IInitialState = initialState,
    action: any
): IInitialState => {
    switch (action.type) {
        case ROLES_FETCHING: {
            return { ...state, isLoading: action.payload };
        }

        case ROLES_FETCHED: {
            return { ...state, roles: action.payload };
        }

        case ROLES_FETCHED_ERR: {
            return { ...state, error: action.payload };
        }

        default:
            return state;
    }
};

export default rolesReducer;