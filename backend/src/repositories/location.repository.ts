import { NotFoundError } from '../errors/NotFoundError';
import { LocationType } from './../models/LocationType';
import {
    AbstractRepository,
    EntityRepository,
    getCustomRepository,
} from 'typeorm';
import { Location } from '../models/Location';
import { LocationTypeRepository } from './locationTypes.repository';

export interface LocationProps {
    id?: number;
    parent?: null | Location;
    location_type: LocationType;
    name: string;
    coordinates: string;
}

@EntityRepository(Location)
export class LocationRepository extends AbstractRepository<Location> {
    // Получить все локации
    async findAll() {
        return await this.getTreeRepositoryFor(Location).find({
            relations: ['masters', 'location_type', 'children'],
        });
    }

    // Получить локации по id типа
    async getAllByType(id: number) {
        return await this.repository.find({ where: { location_type: id } });
    }

    // Получить локацию по id
    async findOneById(id: number) {
        const location = await this.repository.findOne(id)
        return await this.getTreeRepositoryFor(Location).findAncestorsTree(location)
        // return await this.getTreeRepositoryFor(Location).findOne(id, {
        //     relations: ['parent'],
        // });
    }

    // Создать локацию
    async createAndSave(props: LocationProps) {
        const { location_type, name, coordinates, parent } = props;
        const location = new Location();

        location.location_type = location_type;
        location.name = name;
        location.coordinates = coordinates;
        location.parent = parent;

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
        const { id, location_type, name, coordinates, parent } = props;

        // Проверка, есть ли такая локация
        const location = await this.repository.findOne(id);

        if (!location) {
            throw new NotFoundError(404, 'Такой локации не найдено');
        }

        this.repository.merge(location, {
            location_type,
            name,
            coordinates,
            parent,
        });
        const locationTypeRepository = getCustomRepository(
            LocationTypeRepository
        );
        const currentLocationType = await locationTypeRepository.findOneById(
            +location_type
        );
        location.location_type = currentLocationType;

        return await this.repository.save(location);
    }
}
