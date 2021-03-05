import * as ordersRepository from '../repositories/orders.repository';

// Получить все заказы
export const getOrders = async () => {
    return await ordersRepository.getOrders();
};

// Создать заказ
export const createOrder = async (props: ordersRepository.OrderProps) => {
    return await ordersRepository.createOrder(props);
};

// Удалить заказ
export const deleteOrder = async (id: number) => {
    return await ordersRepository.deleteOrder(id);
};

// Обновить заказ
export const updateOrder = async (props: ordersRepository.OrderProps) => {
    return await ordersRepository.updateOrder(props);
};
