import { signupFetched, signupFetching, signupFetchedErr } from './../store/signup/actionCreators';
// Зарегистрироваться
export const signup = (user: any) => (dispatch: any) => {
    dispatch(signupFetching(true));

    fetch('http://localhost:7000/api/users/registration', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }

            dispatch(signupFetching(false));
            return response;
        })
        .then((response) => response.json())
        .then((data) => dispatch(signupFetched(data)))
        .catch((error) => dispatch(signupFetchedErr(error)));
};
