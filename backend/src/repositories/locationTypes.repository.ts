import { LocationRepository } from './location.repository';
import { DeleteError } from '../errors/DeleteError';
import { NotFoundError } from '../errors/NotFoundError';
import { LocationType } from './../models/LocationType';
import {
    AbstractRepository,
    EntityRepository,
    getCustomRepository,
} from 'typeorm';
import { Location } from '../models/Location';

export interface LocationTypeProps {
    id?: number;
    name: string;
}

@EntityRepository(LocationType)
export class LocationTypeRepository extends AbstractRepository<LocationType> {
    // Получить все типы
    async findAll() {
        return await this.repository.find();
    }

    // Получить один тип по id
    async findOneById(id: number) {
        return await this.repository.findOne(id);
    }

    // Создать тип
    async createAndSave(name: string) {
        const locationType = new LocationType();
        locationType.name = name;

        return await this.repository.save(locationType);
    }

    // Удалить тип
    async delete(id: number) {
        // Проверка, есть ли такой тип
        const locationType = await this.repository.findOne(id);
        if (!locationType) {
            throw new NotFoundError(404, 'Такого типа локации не найдено');
        }

        // Проверка, есть ли ешё локации у этого типа
        const locationRepository = getCustomRepository(LocationRepository);
        const locations: Array<Location> = await locationRepository.getAllByType(
            id
        );
        console.log(locations);

        if (locations.length > 0) {
            throw new DeleteError(400, 'У этого типа ещё есть локации');
        }

        return await this.repository.delete(id);
    }

    // Обновить тип
    async updateAndSave(id: number, name: string) {
        // Проверка, есть ли такой тип
        const locationType = await this.repository.findOne(id);
        if (!locationType) {
            throw new NotFoundError(404, 'Такого типа локации не найдено');
        }

        this.repository.merge(locationType, { name });
        return await this.repository.save(locationType);
    }
}
