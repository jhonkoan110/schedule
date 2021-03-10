import { SIGNUP_FETCHING, SIGNUP_FETCHED, SIGNUP_FETCHED_ERR } from './actionTypes';
// Регистрация
export const signupFetching = (isLoading: boolean) => ({
    type: SIGNUP_FETCHING,
    payload: isLoading,
});

export const signupFetched = (response: any) => ({
    type: SIGNUP_FETCHED,
    payload: response,
});

export const signupFetchedErr = (error: string) => ({
    type: SIGNUP_FETCHED_ERR,
    payload: error,
});
