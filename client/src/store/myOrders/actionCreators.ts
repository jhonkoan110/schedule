import { MY_ORDERS_FETCHED, MY_ORDERS_FETCHED_ERR, MY_ORDERS_FETCHING } from './actionTypes';

export const myOrdersFetching = (isLoading: boolean) => ({
    type: MY_ORDERS_FETCHING,
    payload: isLoading,
});
export const myOrdersFetched = (myOrders: any[]) => ({
    type: MY_ORDERS_FETCHED,
    payload: myOrders,
});
export const myOrdersFetchedErr = (error: string) => ({
    type: MY_ORDERS_FETCHED_ERR,
    payload: error,
});
