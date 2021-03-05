import { getRepository } from 'typeorm';
import { Master } from '../models/Master';
import { Order } from '../models/Order';

export interface OrderProps {
    id?: number;
    user_id: number;
    description: string;
    start_date: string;
    end_date: string;
    status: string;
    status_color: string;
    commentary: string;
    photo: string;
    master: Master;
}

// Получить все заказы
export const getOrders = async () => {
    return await getRepository(Order).find();
};

// Создать заказ
export const createOrder = async (props: OrderProps) => {
    const {
        user_id,
        description,
        start_date,
        end_date,
        status,
        status_color,
        commentary,
        photo,
        master,
    } = props;

    const order = new Order();
    const newOrder = {
        ...order,
        user_id,
        description,
        start_date,
        end_date,
        status,
        status_color,
        commentary,
        photo,
        master,
    };

    const ordersRepository = getRepository(Order);
    return await ordersRepository.save(newOrder);
};

// Удалить заказ
export const deleteOrder = async (id: number) => {
    return await getRepository(Order).delete(id);
};

// Обновить заказ
export const updateOrder = async (props: OrderProps) => {
    const {
        id,
        user_id,
        description,
        start_date,
        end_date,
        status,
        status_color,
        commentary,
        photo,
        master,
    } = props;

    const ordersRepository = getRepository(Order);
    const order = await ordersRepository.findOne(id);

    ordersRepository.merge(order, {
        user_id,
        description,
        start_date,
        end_date,
        status,
        status_color,
        commentary,
        photo,
        master,
    });
    return await ordersRepository.save(order);
};
