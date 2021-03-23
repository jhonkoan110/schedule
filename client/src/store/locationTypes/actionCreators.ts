import { LOCATION_TYPES_FETCHED, LOCATION_TYPES_FETCHED_ERR, LOCATION_TYPES_FETCHING } from "./actionTypes";

export const locationTypesFetching = (isLoading: boolean) => ({
    type: LOCATION_TYPES_FETCHING,
    payload: isLoading
})

export const locationTypesFetched = (locationTypes: any) => ({
    type: LOCATION_TYPES_FETCHED,
    payload: locationTypes
})

export const locationTypesFetchedErr = (error: string) => ({
    type: LOCATION_TYPES_FETCHED_ERR,
    payload: error
})