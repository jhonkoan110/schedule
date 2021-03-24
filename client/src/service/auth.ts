import {
    authDataFetched,
    authDataFetchedErr,
    authDataFetching,
} from './../store/auth/actionCreators';

interface LoginData {
    login: string;
    password: string;
}

// Вход
export const login = (loginData: LoginData) => (dispatch: any) => {
    dispatch(authDataFetching(true));
    dispatch(authDataFetchedErr(''));

    fetch('http://localhost:7000/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },

        body: JSON.stringify(loginData),
    })
        .then((response) => {
            if (!response.ok) {
                const temp = response.json();
                temp.then((error) => {
                    dispatch(authDataFetching(false));
                    dispatch(authDataFetchedErr(error.message));
                });
            }

            dispatch(authDataFetching(false));
            return response;
        })
        .then((response) => response.json())
        .then((data) => {
            dispatch(authDataFetched(data));
            localStorage.setItem('user-token', data.token);
            localStorage.setItem('user-login', data.user.login);
            localStorage.setItem('user-role', data.user.role.id);
        })
        .catch((error) => {
            dispatch(authDataFetching(false));
            dispatch(authDataFetchedErr(error.error));
        });
};

// Проверка авторизации
export const checkAuth = () => (dispatch: any) => {
    dispatch(authDataFetching(true));

    fetch('http://localhost:7000/api/users/auth', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('user-token')}`,
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }

            dispatch(authDataFetching(false));
            return response;
        })
        .then((response) => response.json())
        .then((data) => {
            dispatch(authDataFetched(data));
            localStorage.setItem('user-token', data.token);
        })
        .catch((err) => {
            dispatch(authDataFetching(false));
            dispatch(authDataFetchedErr(err.error));
        });
};
