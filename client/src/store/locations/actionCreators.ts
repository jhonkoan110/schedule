import {
    LOCATIONS_FETCHED,
    LOCATIONS_FETCHED_ERR,
    LOCATIONS_FETCHING,
} from './actionTypes';

export const locationsFetching = (isLoading: boolean) => ({
    type: LOCATIONS_FETCHING,
    payload: isLoading,
});

export const locationsFetched = (locationTypes: any) => ({
    type: LOCATIONS_FETCHED,
    payload: locationTypes,
});

export const locationsFetchedErr = (error: string) => ({
    type: LOCATIONS_FETCHED_ERR,
    payload: error,
});
