import { ROLES_FETCHED, ROLES_FETCHED_ERR, ROLES_FETCHING } from "./actionTypes";

export const rolesFetching = (isLoading: boolean) => ({
    type: ROLES_FETCHING,
    payload: isLoading
})


export const rolesFetched = (roles: any) => ({
    type: ROLES_FETCHED,
    payload: roles
})


export const rolesFetchedErr = (error: string) => ({
    type: ROLES_FETCHED_ERR,
    payload: error
})