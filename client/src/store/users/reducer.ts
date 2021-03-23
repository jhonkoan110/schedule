import { USER_LIST_FETCHED, USER_LIST_FETCHED_ERR, USER_LIST_FETCHING } from './actionTypes';

const initialState = {
    users: [],
    isLoading: false,
    error: null,
};

const usersReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case USER_LIST_FETCHING: {
            return { ...state, isLoading: action.payload };
        }

        case USER_LIST_FETCHED: {
            return { ...state, users: action.payload };
        }

        case USER_LIST_FETCHED_ERR: {
            return { ...state, error: action.payload };
        }

        default:
            return state;
    }
};

export default usersReducer;
