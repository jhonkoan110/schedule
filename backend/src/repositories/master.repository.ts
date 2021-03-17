import { Master } from './../models/Master';
import { DeleteError } from './../errors/deleteError';
import { Order } from './../models/Order';
import { NotFoundError } from './../errors/notFoundError';
import { User } from './../models/User';
import { AbstractRepository, EntityRepository, getRepository, getCustomRepository } from 'typeorm';
import { Specialization } from '../models/Specialization';
import { Location } from '../models/Location';
import { OrderRepository } from './orders.repository';

export interface MasterProps {
    id?: number;
    user: User;
    specialization: Specialization;
    location: Location;
}

@EntityRepository(Master)
export class MasterRepository extends AbstractRepository<Master> {
    // Получить всех мастеров
    async findAll() {
        return await this.repository.find();
    }

    // Получить всех мастеров по id специализации
    async findMastersBiSpecializationId(id: number) {
        return await this.repository.find({ where: { specialization: id } });
    }

    // Создать мастера
    async createAndSave(props: MasterProps) {
        const { user, specialization, location } = props;
        const master = new Master();

        master.user = user;
        master.specialization = specialization;
        master.location = location;

        return await this.repository.save(master);
    }

    // Удалить мастера
    async delete(id: number) {
        // Проверка, есть ли мастер
        const master = await this.repository.findOne(id);
        if (!master) {
            throw new NotFoundError(404, 'Такого мастера не найдено');
        }

        // Проверка, есть ли ешё у мастера заказы
        const orderRepository = getCustomRepository(OrderRepository);
        const orders = await orderRepository.findOrdersByMasterId(id);

        if (orders.length > 0) {
            throw new DeleteError(400, 'У этого мастера ещё есть заказы');
        }

        return await this.repository.delete(id);
    }

    // Обновить мастера
    async updateAndSave(props: MasterProps) {
        const { id, user, specialization, location } = props;

        // Проверка, есть ли мастер
        const master = await this.repository.findOne(id);
        if (!master) {
            throw new NotFoundError(404, 'Такого мастера не найдено');
        }

        this.repository.merge(master, { user, specialization, location });
        return await this.repository.save(master);
    }
}
