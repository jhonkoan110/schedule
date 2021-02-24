import * as serviceCatalogRepository from '../repositories/serviceCatalog.repository';

// Получить все услуги
export const getServices = async () => {
    const services = await serviceCatalogRepository.getServices();
    return services;
};

// Создать услугу
export const createService = async (data) => {
    const newService = await serviceCatalogRepository.createService(data);
    return newService;
};

// Удалить услугу
export const deleteService = async (id) => {
    const deletedService = await serviceCatalogRepository.deleteService(id);
    return deletedService;
};
