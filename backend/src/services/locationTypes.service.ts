import { LocationTypeRepository } from './../repositories/locationTypes.repository';
import { Request } from 'express';
import { getCustomRepository } from 'typeorm';

// Получить все типы локации
export const getLocationTypes = async () => {
    const locationTypeRepository = getCustomRepository(LocationTypeRepository);
    return await locationTypeRepository.findAll();
};

// Создать тип локации
export const createLocationType = async (name: string) => {
    const locationTypeRepository = getCustomRepository(LocationTypeRepository);
    return await locationTypeRepository.createAndSave(name);
};

// Удалить тип локации
export const deleteLocationType = async (id: number) => {
    const locationTypeRepository = getCustomRepository(LocationTypeRepository);
    return await locationTypeRepository.delete(id);
};

// Обновить тип локации
export const updateLocationType = async (req: Request) => {
    const locationTypeRepository = getCustomRepository(LocationTypeRepository);
    const { id, name } = req.body;
    return await locationTypeRepository.updateAndSave(id, name);
};
