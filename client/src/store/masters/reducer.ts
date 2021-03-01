import { MASTER_LIST_FETCHING, MASTER_LIST_FETCHED } from './actionTypes';

const initialState = {
    masters: [],
    isListLoading: false,
    listError: null,
};

const mastersReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case MASTER_LIST_FETCHING: {
            return { ...state, isListLoading: action.payload };
        }

        case MASTER_LIST_FETCHED: {
            return { ...state, masters: action.payload };
        }

        default:
            return { ...state };
    }
};

export default mastersReducer;
