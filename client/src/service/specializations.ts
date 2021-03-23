import {
    specializationsFetched,
    specializationsFetchedErr,
    specializationsFetching,
} from '../store/specializtions/actionCreators';
import { ISpecialization } from '../store/specializtions/types';

// Получить все специализации
export const getAllSpecializations = () => (dispatch: any) => {
    dispatch(specializationsFetching(true));

    fetch('http://localhost:7000/api/specializations/', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('user-token')}`,
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('test');
            }

            dispatch(specializationsFetching(false));
            return response;
        })
        .then((response) => response.json())
        .then((data) => dispatch(specializationsFetched(data.specializations)))
        .catch((error) => dispatch(specializationsFetchedErr(error)));
};

// Добавить спец-ю
export const createSpecialization = (newSpec: ISpecialization) => (
    dispatch: any
) => {
    dispatch(specializationsFetching(true));

    fetch('http://localhost:7000/api/specializations/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('user-token')}`,
        },
        body: JSON.stringify(newSpec),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }

            dispatch(specializationsFetching(false));
            dispatch(getAllSpecializations());
            return response;
        })
        .catch((err) => console.log(err));
};

// Удалить специализацию
export const deleteSpecialization = (id: number) => (dispatch: any) => {
    dispatch(specializationsFetching(true));

    fetch(`http://localhost:7000/api/specializations/${id}`, {
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

            dispatch(specializationsFetching(false));
            return response;
        })
        .then(() => dispatch(getAllSpecializations()))
        .catch((err) => dispatch(specializationsFetchedErr(err)));
};

// Обновить спец-ю
export const updateSpecialization = (updatedSpec: ISpecialization) => (
    dispatch: any
) => {
    dispatch(specializationsFetching(true));

    fetch('http://localhost:7000/api/specializations/', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('user-token')}`,
        },
        body: JSON.stringify(updatedSpec),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }

            dispatch(specializationsFetching(false));
            return response;
        })
        .catch((err) => console.log(err));
};
