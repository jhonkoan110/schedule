import {
    MASTERS_FETCHED,
    MASTERS_FETCHED_ERR,
    MASTERS_FETCHING,
} from './actionTypes';

export const mastersFetching = (isLoading: boolean) => {
    return {
        type: MASTERS_FETCHING,
        payload: isLoading,
    };
};

export const mastersFetched = (masters: any) => {
    return {
        type: MASTERS_FETCHED,
        payload: masters,
    };
};

export const mastersFetchedErr = (error: string) => {
    return {
        type: MASTERS_FETCHED_ERR,
        payload: error,
    };
};
