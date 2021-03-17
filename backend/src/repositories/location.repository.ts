import { NotFoundError } from './../errors/notFoundError';
import { LocationType } from './../models/LocationType';
import { getMongoRepository, getRepository } from 'typeorm';
import { Location } from '../models/Location';

export interface LocationProps {
    id?: number;
    parent?: number;
    location_type: LocationType;
    name: string;
    coordinates: string;
}

// Получить все локации
export const getLocations = async () => {
    return await getRepository(Location).find();
};

// Создать локацию
export const createLocation = async (props: LocationProps) => {
    try {
        const { location_type, name, coordinates } = props;
        const location = new Location();

        location.location_type = location_type;
        location.name = name;
        location.coordinates = coordinates;

        return await getRepository(Location).save(location);
    } catch (error) {
        throw new Error(error.message);
    }
};

// Удалить локацию
export const deleteLocation = async (id: number) => {
    // Проверка, есть ли такая локация
    const location = await getRepository(Location).findOne(id);
    console.log(location);

    if (!location) {
        throw new NotFoundError(404, 'Такой локации не найдено');
    }

    return await getRepository(Location).delete(id);
};

// Обновить локацию
export const updateLocation = async (props: LocationProps) => {
    const { id, location_type, name, coordinates } = props;

    const locationsRepository = getRepository(Location);

    const location = await locationsRepository.findOne(id);

    // Проверка, есть ли такая локация
    if (!location) {
        throw new NotFoundError(404, 'Такой локации не найдено');
    }

    locationsRepository.merge(location, { location_type, name, coordinates });

    return await locationsRepository.save(location);
};
