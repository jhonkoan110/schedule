import { IUser } from '../store/users/types';
import {
    userListFetching,
    userListFetched,
    userListFetchedErr,
} from './../store/users/actionCreators';

// Получить пользователей
export const getAllUsers = () => (dispatch: any) => {
    dispatch(userListFetching(true));

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

    fetch('http://localhost:7000/api/users/', {
        method: 'POST',
        headers: {
            'Content-Type': 'applcation/json',
            Authorization: `Bearer ${localStorage.getItem('user-token')}`,
        },
        body: JSON.stringify(newUser),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }

            dispatch(userListFetching(false));
            return response;
        })
        .then(() => dispatch(getAllUsers()))
        .catch((error) => dispatch(userListFetchedErr(error)));
};
