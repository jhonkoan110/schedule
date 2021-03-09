import { NotFoundError } from './../errors/notFoundError';
import { LocationType } from './../models/LocationType';
import { getRepository, Not } from 'typeorm';

export interface LocationTypeProps {
    id?: number;
    name: string;
}

// Получить все типы локации
export const getLocationTypes = async () => {
    try {
        return await getRepository(LocationType).find();
    } catch (error) {
        throw new Error(error.message);
    }
};

// Создать тип локации
export const createLocationType = async (name: string) => {
    try {
        const locationType = new LocationType();
        locationType.name = name;

        const locationTypesRepository = getRepository(LocationType);
        return await locationTypesRepository.save(locationType).catch((err) => console.log(err));
    } catch (error) {
        throw new Error(error.message);
    }
};

// Удалить тип локации
export const deleteLocationType = async (id: number) => {
    try {
        const locationTypesRepository = getRepository(LocationType);

        // Проверка, есть ли такой тип
        const locationType = await locationTypesRepository.findOne(id);
        if (!locationType) {
            throw new NotFoundError('');
        }

        return await locationTypesRepository.delete(id);
    } catch (error) {
        if (error instanceof NotFoundError) {
            throw new NotFoundError('Такой тип не найден');
        } else {
            throw new Error(error.message);
        }
    }
};

// Обновить тип локации
export const updateLocationType = async (id: number, name: string) => {
    try {
        const locationTypesRepository = getRepository(LocationType);
        const locationType = await locationTypesRepository.findOne(id);
        if (!locationType) {
            throw new NotFoundError('');
        }

        locationTypesRepository.merge(locationType, { name });
        return await locationTypesRepository.save(locationType);
    } catch (error) {
        if (error instanceof NotFoundError) {
            throw new NotFoundError('Такой тип не найден');
        } else {
            throw new Error(error.message);
        }
    }
};
