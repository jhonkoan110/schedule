import { SPECIALIZATIONS_FETCHED, SPECIALIZATIONS_FETCHED_ERR, SPECIALIZATIONS_FETCHING } from "./actionTypes";

export const specializationsFetching = (isLoading: boolean) => ({
    type: SPECIALIZATIONS_FETCHING,
    payload: isLoading
})

export const specializationsFetched = (specializations: any) => ({
    type: SPECIALIZATIONS_FETCHED,
    payload: specializations
})

export const specializationsFetchedErr = (error: string) => ({
    type: SPECIALIZATIONS_FETCHED_ERR,
    payload: error
})