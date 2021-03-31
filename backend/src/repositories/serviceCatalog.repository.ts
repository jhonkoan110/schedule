import { ServiceCatalog } from './../models/ServiceCatalog';
import { DeleteError } from '../errors/DeleteError';
import { NotFoundError } from '../errors/NotFoundError';
import {
    AbstractRepository,
    EntityRepository,
    getRepository,
    getCustomRepository,
} from 'typeorm';
import { OrderRepository } from './orders.repository';
import { Specialization } from '../models/Specialization';

export interface ServiceCatalogProps {
    id?: number;
    name: string;
    price: number;
    duration: string;
    specialization: Specialization;
}

@EntityRepository(ServiceCatalog)
export class ServiceCatalogRepository extends AbstractRepository<ServiceCatalog> {
    // Получить все услуги
    async findAll() {
        return await this.repository.find();
    }

    // Создать услугу
    async createAndSave(props: ServiceCatalogProps) {
        const { name, price, duration, specialization } = props;
        const service = new ServiceCatalog();

        service.name = name;
        service.price = price;
        service.duration = duration;
        service.specialization = specialization;

        return await this.repository.save(service);
    }

    // Удалить услугу
    async delete(id: number) {
        // Проверка, есть ли услуга
        const serviceCatalog = await this.repository.findOne(id);
        if (!serviceCatalog) {
            throw new NotFoundError(404, 'Такого сервиса не найдено');
        }

        // Проверка, есть ли еще заказы с этой услугой
        const orderRepository = getCustomRepository(OrderRepository);
        const orders = await orderRepository.findOrdersByServiceId(id);
        if (orders.length > 0) {
            throw new DeleteError(400, 'У этой услуги ещё есть заказы');
        }

        return await this.repository.delete(id);
    }

    // Обновить услугу
    async updateAndSave(props: ServiceCatalogProps) {
        const { id, name, price, duration, specialization } = props;
        // const serviceCatalogRepository = getRepository(ServiceCatalog);

        // Проверка, есть ли такая услуга
        const serviceCatalog = await this.repository.findOne(id);

        if (!serviceCatalog) {
            throw new NotFoundError(404, 'Такого сервиса не найдено');
        }

        this.repository.merge(serviceCatalog, {
            name,
            price,
            duration,
            specialization,
        });
        return await this.repository.save(serviceCatalog);
    }
}
