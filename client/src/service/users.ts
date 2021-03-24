import { IUser } from '../store/users/types';
import {
    userListFetching,
    userListFetched,
    userListFetchedErr,
} from './../store/users/actionCreators';
import { getAllRoles } from './roles';

// Получить пользователей
export const getAllUsers = () => (dispatch: any) => {
    dispatch(userListFetchedErr(null));
    dispatch(userListFetching(true));
    dispatch(getAllRoles());

    fetch('http://localhost:7000/api/users/', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('user-token')}`,
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }

            dispatch(userListFetching(false));
            return response;
        })
        .then((response) => response.json())
        .then((data) => dispatch(userListFetched(data.users)))
        .catch((error) => dispatch(userListFetchedErr(error)));
};

// Создать пользователя
export const createUser = (newUser: IUser) => (dispatch: any) => {
    dispatch(userListFetching(true));

    const finalUser = {
        ...newUser,
        role: newUser.role.id,
    };
    console.log(finalUser);

    fetch('http://localhost:7000/api/users/registration', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('user-token')}`,
        },
        body: JSON.stringify(finalUser),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }

            dispatch(userListFetching(false));
            return response;
        })
        .then(() => dispatch(getAllUsers()))
        .catch((error) => {
            dispatch(userListFetchedErr(error.message));
            dispatch(userListFetching(false));
        });
};

// Удалить пользователя
export const deleteUser = (id: number) => (dispatch: any) => {
    dispatch(userListFetching(true));

    fetch(`http://localhost:7000/api/users/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('user-token')}`,
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }

            dispatch(userListFetching(false));
            return response;
        })
        .then(() => dispatch(getAllUsers()))
        .catch((err) => dispatch(userListFetchedErr(err.message)));
};

// Если редактирование понадобится, сделать его.