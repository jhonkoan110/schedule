import * as ordersRepository from '../repositories/orders.repository';

// Получить все заказы
export const getOrders = async () => {
    const orders = await ordersRepository.getOrders();
    return orders;
};

// Получить заказа по id клиента
export const getOrdersByClient = async (user_id) => {
    const orders = await ordersRepository.getOrdersByClient(user_id);
    return orders;
};

// Создать заказ
export const createOrder = async (data, photoName) => {
    const newOrder = await ordersRepository.createOrder(data, photoName);
    return newOrder;
};

// Обновить заказ
export const updateOrder = async (data, photoName) => {
    const updatedOrder = await ordersRepository.updateOrder(data, photoName);
    return updatedOrder;
};

// Удалить заказ
export const deleteOrder = async (id) => {
    const deletedOrder = await ordersRepository.deleteOrder(id);
    return deletedOrder;
};
