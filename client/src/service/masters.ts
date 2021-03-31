import {
    mastersFetched,
    mastersFetchedErr,
    mastersFetching,
} from '../store/masters/actionCreators';

// Получить всех мастеров
export const getAllMasters = () => (dispatch: any) => {
    dispatch(mastersFetching(true));

    fetch('http://localhost:7000/api/masters/', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('user-token')}`,
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }

            dispatch(mastersFetching(false));
            return response;
        })
        .then((response) => response.json())
        .then((data) => dispatch(mastersFetched(data.masters)))
        .catch((err) => dispatch(mastersFetchedErr(err.message)));
};

// Создать мастера
export const createMaster = (newMaster: any) => (dispatch: any) => {
    dispatch(mastersFetching(true));

    fetch('http://localhost:7000/api/masters/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('user-token')}`,
        },
        body: JSON.stringify(newMaster),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }

            dispatch(mastersFetching(false));
            return response;
        })
        .then(() => dispatch(getAllMasters()))
        .catch((err) => dispatch(mastersFetchedErr(err.message)));
};

// Удалить мастеров
export const deleteMaster = (id: number) => (dispatch: any) => {
    dispatch(mastersFetching(true));

    fetch(`http://localhost:7000/api/masters/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('user-token')}`,
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }

            dispatch(mastersFetching(false));
            return response;
        })
        .then(() => dispatch(getAllMasters()))
        .catch((err) => dispatch(mastersFetchedErr(err.message)));
};
