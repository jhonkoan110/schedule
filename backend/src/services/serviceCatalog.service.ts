import * as serviceCatalogRepository from '../repositories/serviceCatalog.repository';

// Получить все услуги
export const getServiceCatalog = async () => {
    return await serviceCatalogRepository.getServiceCatalog();
};

// Создать услугу
export const createServiceCatalog = async (props: serviceCatalogRepository.ServiceCatalogProps) => {
    return await serviceCatalogRepository.createServiceCatalog(props);
};

// Удалить услугу
export const deleteServiceCatalog = async (id: number) => {
    return await serviceCatalogRepository.deleteServiceCatalog(id);
};

// Обновить услугу
export const updateServicaCatalog = async (props: serviceCatalogRepository.ServiceCatalogProps) => {
    return await serviceCatalogRepository.updateServiceCatalog(props);
};
