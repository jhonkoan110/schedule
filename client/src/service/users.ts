import { userListFetching, userListFetched } from './../store/users/actionCreators';

// Получить пользователей
export const getUsers = () => (dispatch: any) => {
    dispatch(userListFetching(true));

    fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }

            dispatch(userListFetching(false));
            return response;
        })
        .then((response) => response.json())
        .then((users) => dispatch(userListFetched(users)))
        .catch((error) => console.log(error));
};
