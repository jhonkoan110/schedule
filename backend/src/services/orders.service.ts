import * as ordersRepository from '../repositories/orders.repository';

// Получить все заказы
export const getOrders = async () => {
    return await ordersRepository.getOrders();
};

// Создать заказ
export const createOrder = async (props: ordersRepository.OrderProps) => {
    return await ordersRepository.createOrder(props);
};
