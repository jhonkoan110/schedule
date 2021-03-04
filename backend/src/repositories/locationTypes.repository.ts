import { LocationType } from './../models/LocationType';
import { getRepository } from 'typeorm';

export interface LocationTypeProps {
    id?: number;
    name: string;
}

// Получить все типы локации
export const getLocationTypes = async () => {
    return await getRepository(LocationType).find();
};

// Создать тип локации
export const createLocationType = async (name: string) => {
    const locationType = new LocationType();
    locationType.name = name;

    const locationTypesRepository = getRepository(LocationType);
    return await locationTypesRepository.save(locationType).catch((err) => console.log(err));
};

// Удалить тип локации
export const deleteLocationType = async (id: number) => {
    const locationTypesRepository = getRepository(LocationType);
    return await locationTypesRepository.delete(id);
};

// Обновить тип локации
export const updateLocationType = async (id: number, name: string) => {
    const locationTypesRepository = getRepository(LocationType);
    const locationType = await locationTypesRepository.findOne(id);

    locationTypesRepository.merge(locationType, { name });
    return await locationTypesRepository.save(locationType);
};
