import { ORDERS_FETCHING, ORDERS_FETCHED, ORDERS_FETCHED_ERR } from './actionTypes';
// Заказы
export const ordersFetching = (isLoading: boolean) => {
    return {
        type: ORDERS_FETCHING,
        payload: isLoading,
    };
};

export const ordersFetched = (orders: any) => {
    return {
        type: ORDERS_FETCHED,
        payload: orders,
    };
};

export const ordersFetchedErr = (error: string) => {
    return {
        type: ORDERS_FETCHED_ERR,
        payload: error,
    };
};
