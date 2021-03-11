import { ordersFetching, ordersFetched, ordersFetchedErr } from './../store/orders/actionCreators';
// Получить все заказы
export const getOrders = () => (dispatch: any) => {
    dispatch(ordersFetching(true));

    fetch('http://localhost:7000/api/orders/')
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
