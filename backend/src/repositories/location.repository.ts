import { LocationType } from './../models/LocationType';
import { getRepository } from 'typeorm';
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
    const { location_type, name, coordinates } = props;
    const location = new Location();

    location.location_type = location_type;
    location.name = name;
    location.coordinates = coordinates;

    return await getRepository(Location).save(location);
};

// Удалить локацию
export const deleteLocation = async (id: number) => {
    return await getRepository(Location).delete(id);
};
