import {
    locationsFetched,
    locationsFetchedErr,
    locationsFetching,
} from '../store/locations/actionCreators';
import { ILocation } from '../store/locations/types';

// Получить все локации
export const getAllLocations = () => (dispatch: any) => {
    dispatch(locationsFetching(true));

    fetch('http://localhost:7000/api/locations/', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('user-token')}`,
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }

            dispatch(locationsFetching(false));
            return response;
        })
        .then((response) => response.json())
        .then((data) => dispatch(locationsFetched(data.locations)))
        .catch((err) => dispatch(locationsFetchedErr(err.message)));
};

// Добавить локацию
export const createLocation = (newLocation: ILocation) => (dispatch: any) => {
    dispatch(locationsFetching(true));

    console.log(newLocation);

    fetch('http://localhost:7000/api/locations/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('user-token')}`,
        },
        body: JSON.stringify(newLocation),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }

            dispatch(locationsFetching(false));
            return response;
        })
        .then(() => dispatch(getAllLocations()))
        .catch((err) => dispatch(locationsFetchedErr(err.message)));
};

// Удалить локацию
export const deleteLocation = (id: number) => (dispatch: any) => {
    dispatch(locationsFetching(true));

    fetch(`http://localhost:7000/api/locations/${id}`, {
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

            dispatch(locationsFetching(false));
            return response;
        })
        .then(() => dispatch(getAllLocations()))
        .catch((err) => dispatch(locationsFetchedErr(err.message)));
};

// ОБновить локацию
export const updateLocation = (updatedLocation: ILocation) => (
    dispatch: any
) => {
    dispatch(locationsFetching(true));

    console.log(updatedLocation);

    fetch('http://localhost:7000/api/locations/', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('user-token')}`,
        },
        body: JSON.stringify(updatedLocation),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }

            dispatch(locationsFetching(false));
            return response;
        })
        .then(() => dispatch(getAllLocations()))
        .catch((err) => dispatch(locationsFetchedErr(err.message)));
};
