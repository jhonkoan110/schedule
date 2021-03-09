import { NotFoundError } from './../errors/notFoundError';
import { getRepository } from 'typeorm';
import { ServiceCatalog } from '../models/ServiceCatalog';

export interface ServiceCatalogProps {
    id?: number;
    name: string;
    price: number;
    duration: string;
    specialization: string;
}

// Получить все услуги
export const getServiceCatalog = async () => {
    try {
        return await getRepository(ServiceCatalog).find();
    } catch (error) {
        throw new Error(error.mesage);
    }
};

// Создать услугу
export const createServiceCatalog = async (props: ServiceCatalogProps) => {
    try {
        const { name, price, duration, specialization } = props;
        const serviceCatalog = new ServiceCatalog();

        serviceCatalog.name = name;
        serviceCatalog.price = price;
        serviceCatalog.duration = duration;
        serviceCatalog.specialization = specialization;

        const serviceCatalogRepository = getRepository(ServiceCatalog);
        return await serviceCatalogRepository.save(serviceCatalog).catch((err) => console.log(err));
    } catch (error) {
        throw new Error(error.message);
    }
};

// Удалить услугу
export const deleteServiceCatalog = async (id: number) => {
    try {
        // Проверка, есть ли услуга
        const serviceCatalog = await getRepository(ServiceCatalog).findOne(id);
        if (!serviceCatalog) {
            throw new NotFoundError('');
        }

        return await getRepository(ServiceCatalog).delete(id);
    } catch (error) {
        if (error instanceof NotFoundError) {
            throw new NotFoundError('Такого сервиса не найдено');
        } else {
            throw new Error(error.message);
        }
    }
};

// Обновить услугу
export const updateServiceCatalog = async (props: ServiceCatalogProps) => {
    try {
        const { id, name, price, duration, specialization } = props;
        const serviceCatalogRepository = getRepository(ServiceCatalog);
        const serviceCatalog = await serviceCatalogRepository.findOne();

        if (!serviceCatalog) {
            throw new NotFoundError('');
        }

        serviceCatalogRepository.merge(serviceCatalog, {
            id,
            name,
            price,
            duration,
            specialization,
        });
        return await serviceCatalogRepository.save(serviceCatalog);
    } catch (error) {
        if (error instanceof NotFoundError) {
            throw new NotFoundError('Такого сервиса не найдено');
        } else {
            throw new Error(error.message);
        }
    }
};
