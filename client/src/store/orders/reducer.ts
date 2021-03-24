import {
    ORDERS_FETCHED,
    ORDERS_FETCHING,
    ORDERS_FETCHED_ERR,
} from './actionTypes';
import { OrdersInitialState } from './types';

const initialState: OrdersInitialState = {
    orders: [],
    error: null,
    isLoading: false,
};

const ordersReducer = (
    state = initialState,
    action: any
): OrdersInitialState => {
    switch (action.type) {
        case ORDERS_FETCHING: {
            return { ...state, isLoading: action.payload };
        }

        case ORDERS_FETCHED: {
            return { ...state, orders: action.payload };
        }

        case ORDERS_FETCHED_ERR: {
            return { ...state, error: action.payload };
        }

        default:
            return state;
    }
};

export default ordersReducer;
