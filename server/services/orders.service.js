import * as ordersRepository from '../repositories/orders.repository';

// Получить все заказы
export const getOrders = async () => {
    const orders = await ordersRepository.getOrders();
    return orders;
};

// Создать заказ
export const createOrder = async (data, photoName) => {
    const newOrder = await ordersRepository.createOrder(data, photoName);
    return newOrder;
};

// Удалить заказ
export const deleteOrder = async (id) => {
    const deletedOrder = await ordersRepository.deleteOrder(id);
    return deletedOrder;
};
