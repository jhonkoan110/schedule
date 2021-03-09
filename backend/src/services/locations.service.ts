import { LocationProps } from './../repositories/location.repository';
import * as locationsRepository from '../repositories/location.repository';

// Получить все локации
export const getLocations = async () => {
    return await locationsRepository.getLocations();
};

// Создать локацию
export const createLocation = async (props: LocationProps) => {
    return await locationsRepository.createLocation(props);
};

// Удалить локацию
export const deleteLocation = async (id: number) => {
    return await locationsRepository.deleteLocation(id);
};

// Обновить локацию
export const updateLocation = async (props: LocationProps) => {
    return await locationsRepository.updateLocation(props);
};
