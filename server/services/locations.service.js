import * as locationsRepository from '../repositories/locations.repository';

// Получить все локации
export const getLocations = async () => {
    const locations = await locationsRepository.getLocations();
    return locations;
};

// Создать локацию
export const createLocation = async (data) => {
    const newLocation = await locationsRepository.createLocation(data);
    return newLocation;
};

// Удалить локацию
export const deleteLocation = async (id) => {
    const deletedLocation = await locationsRepository.deleteLocation(id);
    return deletedLocation;
};
