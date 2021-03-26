import { getCustomRepository } from 'typeorm';
import {
    LocationProps,
    LocationRepository,
} from './../repositories/location.repository';

// Получить все локации
export const getLocations = async () => {
    const locationReposiory = getCustomRepository(LocationRepository);
    return await locationReposiory.findAll();
};

// Получить локацию по id
export const getOneLocationById = async (id: number) => {
    return await getCustomRepository(LocationRepository).findOneById(id);
};

// Создать локацию
export const createLocation = async (props: LocationProps) => {
    const locationReposiory = getCustomRepository(LocationRepository);
    return await locationReposiory.createAndSave(props);
};

// Удалить локацию
export const deleteLocation = async (id: number) => {
    const locationReposiory = getCustomRepository(LocationRepository);
    return await locationReposiory.delete(id);
};

// Обновить локацию
export const updateLocation = async (props: LocationProps) => {
    const locationReposiory = getCustomRepository(LocationRepository);
    return await locationReposiory.updateAndSave(props);
};
