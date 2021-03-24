import { SERVICE_CATALOG_FETCHED, SERVICE_CATALOG_FETCHED_ERR, SERVICE_CATALOG_FETCHING } from "./actionTypes"

export const serviceCatalogFetching = (isLoading: boolean) => ({
    type: SERVICE_CATALOG_FETCHING,
    payload: isLoading
})

export const serviceCatalogFetched = (serviceCatalog: any) => ({
    type: SERVICE_CATALOG_FETCHED,
    payload: serviceCatalog
})

export const serviceCatalogFetchedErr = (error: string) => ({
    type: SERVICE_CATALOG_FETCHED_ERR,
    payload: error
})