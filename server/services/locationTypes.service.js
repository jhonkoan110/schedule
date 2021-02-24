import * as locationTypesRepository from '../repositories/locationTypes.repository';

// Получить все типы локаций
export const getLocationTypes = async () => {
    const locationTypes = await locationTypesRepository.getLocationTypes();
    return locationTypes;
};

// Создать тип локации
export const createLocationType = async (data) => {
    const newLocationType = await locationTypesRepository.createLocationType(data);
    return newLocationType;
};

// Удалить тип локации
export const deleteLocationType = async (id) => {
    const deletedLocationType = await locationTypesRepository.deleteLocationType(id);
    return deletedLocationType;
};
