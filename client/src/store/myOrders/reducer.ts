import {
    MY_ORDERS_FETCHED,
    MY_ORDERS_FETCHED_ERR,
    MY_ORDERS_FETCHING,
} from './actionTypes';
import { MyOrdersInitialState } from './types';

const initialSstate: MyOrdersInitialState = {
    myOrders: [],
    error: null,
    isLoading: false,
};

const myOrdersReducer = (state = initialSstate, action: any) => {
    switch (action.type) {
        case MY_ORDERS_FETCHING: {
            return { ...state, isLoading: action.payload };
        }

        case MY_ORDERS_FETCHED: {
            return { ...state, myOrders: action.payload };
        }
        case MY_ORDERS_FETCHED_ERR: {
            return { ...state, error: action.payload };
        }

        default:
            return state;
    }
};

export default myOrdersReducer;
