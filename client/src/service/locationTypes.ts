import {
    locationTypesFetched,
    locationTypesFetchedErr,
    locationTypesFetching,
} from '../store/locationTypes/actionCreators';
import { ILocationTypes } from '../store/locationTypes/types';

// Получить все типы локаций
export const getAllLocationTypes = () => (dispatch: any) => {
    dispatch(locationTypesFetching(true));

    fetch('http://localhost:7000/api/location_types/', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('user-token')}`,
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }

            dispatch(locationTypesFetching(false));
            return response;
        })
        .then((response) => response.json())
        .then((data) => dispatch(locationTypesFetched(data.locationTypes)))
        .catch((err) => dispatch(locationTypesFetchedErr(err)));
};

// Добавить тип локации
export const createLocationType = (newLocationType: ILocationTypes) => (
    dispatch: any
) => {
    dispatch(locationTypesFetching(true));

    fetch('http://localhost:7000/api/location_types/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('user-token')}`,
        },
        body: JSON.stringify(newLocationType),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }

            dispatch(locationTypesFetching(false));
            return response;
        })
        .then(() => dispatch(getAllLocationTypes()))
        .catch((err) => dispatch(locationTypesFetchedErr(err)));
};

// Удалить тип локации
export const deleteLocationType = (id: number) => (dispatch: any) => {
    dispatch(locationTypesFetching(true));

    fetch(`http://localhost:7000/api/location_types/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('user-token')}`,
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }

            dispatch(locationTypesFetching(false));
            return response;
        })
        .then(() => dispatch(getAllLocationTypes()))
        .catch((err) => dispatch(locationTypesFetchedErr(err)));
};

// Обновить тип локации
export const updateLocationType = (updatedLocationType: ILocationTypes) => (
    dispatch: any
) => {
    dispatch(locationTypesFetching(true));

    fetch(`http://localhost:7000/api/location_types/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('user-token')}`,
        },
        body: JSON.stringify(updatedLocationType),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }

            dispatch(locationTypesFetching(false));
            return response;
        })
        .then(() => dispatch(getAllLocationTypes()))
        .catch((err) => dispatch(locationTypesFetchedErr(err)));
};
