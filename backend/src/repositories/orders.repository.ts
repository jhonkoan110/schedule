import { ServiceCatalog } from './../models/ServiceCatalog';
import { NotFoundError } from '../errors/NotFoundError';
import {
    AbstractRepository,
    EntityRepository,
    getRepository,
    Not,
    TreeChildren,
} from 'typeorm';
import { Master } from '../models/Master';
import { Order } from '../models/Order';
import { User } from '../models/User';
import { Location } from '../models/Location';

export interface OrderProps {
    id?: number;
    user: User;
    description: string;
    start_date: string;
    end_date: string;
    status: string;
    status_color: string;
    commentary: string;
    photo: string;
    master?: Master;
    service: ServiceCatalog;
    location: Location
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

    // Получить заказы по id пользователя
    async findOrdersByUserId(id: number) {
        return await this.repository.find({ where: { user: id } });
    }

    // Создать заказ
    async createAndSave(props: OrderProps) {
        const {
            user,
            description,
            start_date,
            end_date,
            status,
            status_color,
            commentary,
            photo,
            master,
            service,
            location
        } = props;

        const order = new Order();
        const newOrder = {
            ...order,
            user,
            description,
            start_date,
            end_date,
            status,
            status_color,
            commentary,
            photo,
            master,
            service,
            location
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
            user,
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
            user,
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
