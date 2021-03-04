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
    return await getRepository(ServiceCatalog).find();
};

// Создать услугу
export const createServiceCatalog = async (props: ServiceCatalogProps) => {
    const { name, price, duration, specialization } = props;
    const serviceCatalog = new ServiceCatalog();

    serviceCatalog.name = name;
    serviceCatalog.price = price;
    serviceCatalog.duration = duration;
    serviceCatalog.specialization = specialization;

    const serviceCatalogRepository = getRepository(ServiceCatalog);
    return await serviceCatalogRepository.save(serviceCatalog).catch((err) => console.log(err));
};

// Удалить услугу
export const deleteServiceCatalog = async (id: number) => {
    return await getRepository(ServiceCatalog).delete(id);
};

// // Обновить услугу
export const updateServiceCatalog = async (props: ServiceCatalogProps) => {
    const { id, name, price, duration, specialization } = props;

    const serviceCatalogRepository = getRepository(ServiceCatalog);
    const serviceCatalog = await serviceCatalogRepository.findOne();

    serviceCatalogRepository.merge(serviceCatalog, { id, name, price, duration, specialization });
    return await serviceCatalogRepository.save(serviceCatalog);
};
