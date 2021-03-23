import {
    rolesFetched,
    rolesFetchedErr,
    rolesFetching,
} from '../store/roles/actionCreators';

// Получить все роли
export const getAllRoles = () => (dispatch: any) => {
    dispatch(rolesFetching(true));

    fetch('http://localhost:7000/api/roles/', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('user-token')}`,
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            dispatch(rolesFetching(false));
            return response;
        })
        .then((response) => response.json())
        .then((data) => dispatch(rolesFetched(data.roles)))
        .catch((err) => dispatch(rolesFetchedErr(err)));
};
