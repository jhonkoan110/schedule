import { DeleteError } from './../errors/deleteError';
import { NotFoundError } from './../errors/notFoundError';
import { LocationType } from './../models/LocationType';
import { getRepository, Not } from 'typeorm';
import { Location } from '../models/Location';

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

    // Проверка, есть ли такой тип
    const locationType = await locationTypesRepository.findOne(id);
    if (!locationType) {
        throw new NotFoundError(404, 'Такого типа локации не найдено');
    }

    // Проверка, есть ли ешё локации у этого типа
    const locations = await getRepository(Location).find({ where: { location_type: id } });
    if (locations.length > 0) {
        throw new DeleteError(400, 'У этого типа ещё есть локации');
    }

    return await locationTypesRepository.delete(id);
};

// Обновить тип локации
export const updateLocationType = async (id: number, name: string) => {
    const locationTypesRepository = getRepository(LocationType);
    const locationType = await locationTypesRepository.findOne(id);
    if (!locationType) {
        throw new NotFoundError(404, 'Такого типа локации не найдено');
    }

    locationTypesRepository.merge(locationType, { name });
    return await locationTypesRepository.save(locationType);
};
