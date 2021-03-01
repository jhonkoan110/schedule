import { masterListFetching, masterListFetched } from './../store/masters/actionCreators';

export const getMasterList = () => (dispatch: any) => {
    dispatch(masterListFetching(true));

    fetch('https://api.github.com/users')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Не удалось получить список мастеров');
            }

            dispatch(masterListFetching(false));
            return response;
        })
        .then((response) => response.json())
        .then((masters) => dispatch(masterListFetched(masters)))
        .catch((error) => console.log(error));
};
