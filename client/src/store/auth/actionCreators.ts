import { AUTH_DATA_FETCHING, AUTH_DATA_FETCHED, AUTH_DATA_FETCHED_ERR } from './actionTypes';

// Аутентификация
export const authDataFetching = (isFetching: boolean) => ({
    type: AUTH_DATA_FETCHING,
    payload: isFetching,
});

export const authDataFetched = (authData: any) => ({
    type: AUTH_DATA_FETCHED,
    payload: authData,
});

export const authDataFetchedErr = (error: string) => ({
    type: AUTH_DATA_FETCHED_ERR,
    payload: error,
});
