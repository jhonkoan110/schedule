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
    try {
        return await getRepository(Location).find();
    } catch (error) {
        throw new Error(error.message);
    }
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
    try {
        // Проверка, есть ли такая локация
        const location = await getRepository(Location).findOne(id);
        if (!location) {
            throw new NotFoundError('');
        }

        return await getRepository(Location).delete(id);
    } catch (error) {
        if (error instanceof NotFoundError) {
            throw new NotFoundError('Такой локации не найдно');
        } else {
            throw new Error(error.message);
        }
    }
};

// Обновить локацию
export const updateLocation = async (props: LocationProps) => {
    try {
        const { id, location_type, name, coordinates } = props;
        const locationsRepository = getMongoRepository(Location);

        const location = await locationsRepository.findOne(id);
        // Проверка, есть ли такая локация
        if (!location) {
            throw new NotFoundError('');
        }

        locationsRepository.merge(location, { location_type, name, coordinates });

        return await locationsRepository.save(location);
    } catch (error) {
        if (error instanceof NotFoundError) {
            throw new NotFoundError('Такой локации не найдно');
        } else {
            throw new Error(error.message);
        }
    }
};
