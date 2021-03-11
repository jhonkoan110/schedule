import { ORDERS_FETCHED, ORDERS_FETCHING, ORDERS_FETCHED_ERR } from './actionTypes';

export interface IOrder {
    id?: number;
    master_id: number;
    user_id: number;
    description: string;
    start_date: string;
    end_date: string;
    status: string;
    statusColor: string;
    commentary: string;
    photo: string;
}

interface IInitialState {
    orders: Array<IOrder>;
    error: null | string;
    isLoading: boolean;
}

const initialState: IInitialState = {
    orders: [],
    error: null,
    isLoading: false,
};

const ordersReducer = (state = initialState, action: any): IInitialState => {
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
