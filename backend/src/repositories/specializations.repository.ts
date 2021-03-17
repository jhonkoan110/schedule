import { DeleteError } from './../errors/deleteError';
import { NotFoundError } from './../errors/notFoundError';
import { Specialization } from './../models/Specialization';
import { AbstractRepository, EntityRepository, getCustomRepository } from 'typeorm';
import { throws } from 'assert';
import { MasterRepository } from './master.repository';

export interface SpecializationProps {
    id?: number;
    name: string;
    icon: string;
}

@EntityRepository(Specialization)
export class SpecializationRepository extends AbstractRepository<Specialization> {
    async findByName(name: string) {
        return await this.repository.findOne(name);
    }

    // Получить все спец-и
    async findAll() {
        return await this.repository.find();
    }

    // Создать спец-ю
    async createAndSave(name: string, icon: string) {
        const specialization = new Specialization();
        specialization.name = name;
        specialization.icon = icon;

        return await this.repository.save(specialization);
    }

    // Удалить спец-ю
    async delete(id: number) {
        // Проверка, есть ли такая спец-я
        const specialization = await this.repository.findOne(id);

        if (!specialization) {
            throw new NotFoundError(404, 'Такой специализации не найдено');
        }

        // Проверка, остались ли ещё мастера у спец-и
        const masterRepository = getCustomRepository(MasterRepository);
        const masters = await masterRepository.findMastersBiSpecializationId(id);
        if (masters.length > 0) {
            throw new DeleteError(400, 'У этой специализации ещё есть мастера');
        }

        return this.repository.delete(id);
    }

    // Обновить спец-ю
    async updateAndSave(props: SpecializationProps) {
        const { id, name, icon } = props;

        // Проверка, есть ли такая спец-я
        const specialization = await this.repository.findOne(id);
        if (!specialization) {
            throw new NotFoundError(404, 'Такой специализации не найдено');
        }

        this.repository.merge(specialization, { name, icon });
        return await this.repository.save(specialization);
    }
}
