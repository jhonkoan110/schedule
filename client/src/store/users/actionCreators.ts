import { USER_LIST_FETCHING, USER_LIST_FETCHED, USER_LIST_FETCHED_ERR } from './actionTypes';

// Список пользователей
export const userListFetching = (isLoading: boolean) => ({
    type: USER_LIST_FETCHING,
    payload: isLoading,
});

export const userListFetched = (users: Array<Object>) => ({
    type: USER_LIST_FETCHED,
    payload: users,
});

export const userListFetchedErr = (error: string) => ({
    type: USER_LIST_FETCHED_ERR,
    payload: error,
});
