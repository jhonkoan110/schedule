import { NotFoundError } from '../errors/NotFoundError';
import { LocationType } from './../models/LocationType';
import { AbstractRepository, EntityRepository } from 'typeorm';
import { Location } from '../models/Location';

export interface LocationProps {
    id?: number;
    parent?: number;
    location_type: LocationType;
    name: string;
    coordinates: string;
}

@EntityRepository(Location)
export class LocationRepository extends AbstractRepository<Location> {
    // Получить все локации
    async findAll() {
        return await this.repository.find();
    }

    // Получить локации по id типа
    async getAllByType(id: number) {
        return await this.repository.find({ where: { location_type: id } });
    }

    // Создать локацию
    async createAndSave(props: LocationProps) {
        const { location_type, name, coordinates } = props;
        const location = new Location();

        location.location_type = location_type;
        location.name = name;
        location.coordinates = coordinates;

        return await this.repository.save(location);
    }

    // Удалить локацию
    async delete(id: number) {
        // Проверка, есть ли такая локация
        const location = await this.repository.findOne(id);

        if (!location) {
            throw new NotFoundError(404, 'Такой локации не найдено');
        }

        return await this.repository.delete(id);
    }

    // Обновить локацию
    async updateAndSave(props: LocationProps) {
        const { id, location_type, name, coordinates } = props;

        // Проверка, есть ли такая локация
        const location = await this.repository.findOne(id);

        if (!location) {
            throw new NotFoundError(404, 'Такой локации не найдено');
        }

        this.repository.merge(location, { location_type, name, coordinates });

        return await this.repository.save(location);
    }
}
