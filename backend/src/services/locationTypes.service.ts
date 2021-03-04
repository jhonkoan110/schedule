import { Request } from 'express';
import * as locationTypesRepository from '../repositories/locationTypes.repository';

// Получить все типы локации
export const getLocationTypes = async () => {
    return await locationTypesRepository.getLocationTypes();
};

// Создать тип локации
export const createLocationType = async (name: string) => {
    return await locationTypesRepository.createLocationType(name);
};

// Удалить тип локации
export const deleteLocationType = async (id: number) => {
    return await locationTypesRepository.deleteLocationType(id);
};

// Обновить тип локации
export const updateLocationType = async (req: Request) => {
    const { id, name } = req.body;
    return await locationTypesRepository.updateLocationType(id, name);
};
