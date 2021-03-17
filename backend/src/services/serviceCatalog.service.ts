import {
    ServiceCatalogProps,
    ServiceCatalogRepository,
} from './../repositories/serviceCatalog.repository';
import { getCustomRepository } from 'typeorm';

// Получить все услуги
export const getServiceCatalog = async () => {
    const serviceCatalogRepository = getCustomRepository(ServiceCatalogRepository);
    return await serviceCatalogRepository.findAll();
};

// Создать услугу
export const createServiceCatalog = async (props: ServiceCatalogProps) => {
    const serviceCatalogRepository = getCustomRepository(ServiceCatalogRepository);
    return await serviceCatalogRepository.createAndSave(props);
};

// Удалить услугу
export const deleteServiceCatalog = async (id: number) => {
    const serviceCatalogRepository = getCustomRepository(ServiceCatalogRepository);
    return await serviceCatalogRepository.delete(id);
};

// Обновить услугу
export const updateServicaCatalog = async (props: ServiceCatalogProps) => {
    const serviceCatalogRepository = getCustomRepository(ServiceCatalogRepository);
    return await serviceCatalogRepository.updateAndSave(props);
};
