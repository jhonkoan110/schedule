import { getCustomRepository } from 'typeorm';
import { OrderProps, OrderRepository } from '../repositories/orders.repository';

// Получить все заказы
export const getOrders = async () => {
    const orderRepository = getCustomRepository(OrderRepository);
    return await orderRepository.findAll();
};

// Получить заказы по id пользователя
export const getOrdersByUserId = async (id: number) => {
    const orderRepository = getCustomRepository(OrderRepository);
    return await orderRepository.findOrdersByUserId(id);
};

// Создать заказ
export const createOrder = async (props: OrderProps) => {
    const orderRepository = getCustomRepository(OrderRepository);
    return await orderRepository.createAndSave(props);
};

// Удалить заказ
export const deleteOrder = async (id: number) => {
    const orderRepository = getCustomRepository(OrderRepository);
    return await orderRepository.delete(id);
};

// Обновить заказ
export const updateOrder = async (props: OrderProps) => {
    const orderRepository = getCustomRepository(OrderRepository);
    return await orderRepository.updateAndSave(props);
};
