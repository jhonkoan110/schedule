import {
    ordersFetching,
    ordersFetched,
    ordersFetchedErr,
} from './../store/orders/actionCreators';

// Получить все заказы
export const getAllOrders = () => (dispatch: any) => {
    dispatch(ordersFetching(true));

    fetch('http://localhost:7000/api/orders/', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('user-token')}`,
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }

            dispatch(ordersFetching(false));
            return response;
        })
        .then((response) => response.json())
        .then((data) => dispatch(ordersFetched(data.orders)))
        .catch((error) => dispatch(ordersFetchedErr(error)));
};

// Получить заказы по id мастера
export const getOrdersByMasterId = (master_id: number) => (dispatch: any) => {
    dispatch(ordersFetching(true));

    fetch(`http://localhost:7000/api/orders/master/${master_id}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('user-token')}`,
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }

            dispatch(ordersFetching(false));
            return response;
        })
        .then((response) => response.json())
        .then((data) => dispatch(ordersFetched(data.orders)))
        .catch((error) => dispatch(ordersFetchedErr(error)));
};

// Создать заказ
export const createOrder = (newOrder: any) => (dispatch: any) => {
    dispatch(ordersFetching(true));

    fetch('http://localhost:7000/api/orders/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('user-token')}`,
        },
        body: JSON.stringify(newOrder),
    })
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }

            dispatch(ordersFetching(false));
            return response;
        })
        .then((data) => dispatch(getAllOrders()))
        .catch((error) => dispatch(ordersFetchedErr(error)));
};

// Удалить заказ
export const deleteOrder = (id: number) => (dispatch: any) => {
    dispatch(ordersFetching(true));

    fetch(`http://localhost:7000/api/orders/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('user-token')}`,
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }

            dispatch(ordersFetching(false));
            return response;
        })
        .then((data) => dispatch(getAllOrders()))
        .catch((error) => dispatch(ordersFetchedErr(error)));
};

// Обновить заказ
export const updateOrder = (updatedOrder: any) => (dispatch: any) => {
    dispatch(ordersFetching(true));

    fetch('http://localhost:7000/api/orders/', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('user-token')}`,
        },
        body: JSON.stringify(updatedOrder),
    })
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }

            dispatch(ordersFetching(false));
            return response;
        })
        .then((data) => dispatch(getAllOrders()))
        .catch((error) => dispatch(ordersFetchedErr(error)));
};
