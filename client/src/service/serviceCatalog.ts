import {
    serviceCatalogFetched,
    serviceCatalogFetchedErr,
    serviceCatalogFetching,
} from '../store/serviceCatalog/actionCreators';
import { IServiceCatalog } from '../store/serviceCatalog/types';

// Получить все услуги
export const getAllServiceCatalogs = () => (dispatch: any) => {
    dispatch(serviceCatalogFetching(true));

    fetch('http://localhost:7000/api/services/', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('user-token')}`,
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            dispatch(serviceCatalogFetching(false));
            return response;
        })
        .then((response) => response.json())
        .then((data) => dispatch(serviceCatalogFetched(data.serviceCatalog)))
        .catch((err) => dispatch(serviceCatalogFetchedErr(err.message)));
};

// Добавить услугу
export const createServiceCatalog = (newService: IServiceCatalog) => (
    dispatch: any
) => {
    dispatch(serviceCatalogFetching(true));

    fetch('http://localhost:7000/api/services/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('user-token')}`,
        },
        body: JSON.stringify(newService)
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            dispatch(serviceCatalogFetching(false));
            return response;
        })
        .then(() => dispatch(getAllServiceCatalogs()))
        .catch((err) => dispatch(serviceCatalogFetchedErr(err.message)));
};

// Удалить услугу
export const deleteServiceCatalog = (id: number) => (
    dispatch: any
) => {
    dispatch(serviceCatalogFetching(true));

    fetch(`http://localhost:7000/api/services/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('user-token')}`,
        }
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            dispatch(serviceCatalogFetching(false));
            return response;
        })
        .then(() => dispatch(getAllServiceCatalogs()))
        .catch((err) => dispatch(serviceCatalogFetchedErr(err.message)));
};

// Обновить услугу
export const updateServiceCatalog = (updatedService: IServiceCatalog) => (
    dispatch: any
) => {
    dispatch(serviceCatalogFetching(true));

    fetch('http://localhost:7000/api/services/', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('user-token')}`,
        },
        body: JSON.stringify(updatedService)
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            dispatch(serviceCatalogFetching(false));
            return response;
        })
        .then(() => dispatch(getAllServiceCatalogs()))
        .catch((err) => dispatch(serviceCatalogFetchedErr(err.message)));
};
