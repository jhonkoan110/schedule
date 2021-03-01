import { MASTER_LIST_FETCHING, MASTER_LIST_FETCHED, MASTER_LIST_FETCHED_ERR } from './actionTypes';

// ======================= Для списка мастеров =======================
export const masterListFetching = (isListLoading: boolean) => ({
    type: MASTER_LIST_FETCHING,
    payload: isListLoading,
});

export const masterListFetched = (masters: any) => ({
    type: MASTER_LIST_FETCHED,
    payload: masters,
});

export const masterListFetchedErr = (error: string) => ({
    type: MASTER_LIST_FETCHED_ERR,
    payload: error,
});
