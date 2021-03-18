import { ServiceCatalog } from './../models/ServiceCatalog';
import { NotFoundError } from './../errors/notFoundError';
import { AbstractRepository, EntityRepository, getRepository, Not, TreeChildren } from 'typeorm';
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
    service: ServiceCatalog;
}

@EntityRepository(Order)
export class OrderRepository extends AbstractRepository<Order> {
    // Получить все заказы
    async findAll() {
        return await this.repository.find();
    }

    // Получить заказы по id мастера
    async findOrdersByMasterId(id: number) {
        return await this.repository.find({ where: { master: id } });
    }

    // Получить заказы по id услуги
    async findOrdersByServiceId(id: number) {
        return await this.repository.find({ where: { service: id } });
    }

    // Создать заказ
    async createAndSave(props: OrderProps) {
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
            service,
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
            service,
        };

        return await this.repository.save(newOrder);
    }

    // Удалить заказ
    async delete(id: number) {
        // Проверка, есть ли заказ
        const order = await this.repository.findOne(id);
        if (!order) {
            throw new NotFoundError(404, 'Такого заказа не найдено');
        }

        return await this.repository.delete(id);
    }

    // Обновить заказ
    async updateAndSave(props: OrderProps) {
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

        const order = await this.repository.findOne(id);
        // Проверка, есть ли заказ
        if (!order) {
            throw new NotFoundError(404, 'Такого заказа не найдено');
        }

        this.repository.merge(order, {
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
        return await this.repository.save(order);
    }
}
