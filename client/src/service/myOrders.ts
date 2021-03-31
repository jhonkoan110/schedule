import {
    myOrdersFetched,
    myOrdersFetchedErr,
    myOrdersFetching,
} from '../store/myOrders/actionCreators';

// Получить все заказы по id пользователя
export const getOrdersByUserId = (id: number) => (dispatch: any) => {
    dispatch(myOrdersFetching(true));

    fetch(`http://localhost:7000/api/orders/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('user-token')}`,
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }

            dispatch(myOrdersFetching(false));
            return response;
        })
        .then((response) => response.json())
        .then((data) => dispatch(myOrdersFetched(data.orders)))
        .catch((err) => dispatch(myOrdersFetchedErr(err.message)));
};

// Получить заказ по id
export const getOrderById = (id: number) => (dispatch: any) => {
    dispatch(myOrdersFetching(true));

    fetch(`http://localhost:7000/api/orders/order_id/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('user-token')}`,
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }

            dispatch(myOrdersFetching(false));
            return response;
        })
        .then((response) => response.json())
        .then((data) => dispatch(myOrdersFetched(data.orders)))
        .catch((err) => dispatch(myOrdersFetchedErr(err.message)));
};