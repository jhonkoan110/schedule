import { NotFoundError } from './../errors/notFoundError';
import { getRepository, Not } from 'typeorm';
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
    try {
        return await getRepository(Order).find();
    } catch (error) {
        throw new Error(error.message);
    }
};

// Создать заказ
export const createOrder = async (props: OrderProps) => {
    try {
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
    } catch (error) {
        throw new Error(error.message);
    }
};

// Удалить заказ
export const deleteOrder = async (id: number) => {
    try {
        // Проверка, есть ли заказ
        const order = await getRepository(Order).findOne(id);
        if (!order) {
            throw new NotFoundError('');
        }

        return await getRepository(Order).delete(id);
    } catch (error) {
        if (error instanceof NotFoundError) {
            throw new NotFoundError('Такого заказа не найдено');
        } else {
            throw new Error(error.message);
        }
    }
};

// Обновить заказ
export const updateOrder = async (props: OrderProps) => {
    try {
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
        // Проверка, есть ли заказ
        if (!order) {
            throw new NotFoundError('');
        }

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
    } catch (error) {
        if (error instanceof NotFoundError) {
            throw new NotFoundError('Такого заказа не найдено');
        } else {
            throw new Error(error.message);
        }
    }
};
