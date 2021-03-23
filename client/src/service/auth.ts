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
                // switch (response.status) {
                //     case 404: {
                //         const temp = response.json();
                //         temp.then((error) => {
                //             dispatch(authDataFetching(false));
                //             dispatch(authDataFetchedErr(error));
                //         });
                //         break;
                //     }

                //     case 400: {
                //         const temp = response.json();
                //         temp.then((error) => {
                //             dispatch(authDataFetching(false));
                //             dispatch(authDataFetchedErr(error));
                //         });
                //         break;
                //     }

                //     default: {
                //         throw new Error('Ошибка сервера');
                //     }
                // }
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
        })
        .catch((error) => {
            dispatch(authDataFetching(false));
            dispatch(authDataFetchedErr(error.error));
        });
};
