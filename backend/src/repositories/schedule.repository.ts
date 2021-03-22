import { NotFoundError } from '../errors/NotFoundError';
import { Schedule } from './../models/Schedule';
import { AbstractRepository, EntityRepository } from 'typeorm';
import { Master } from './../models/Master';

export interface ScheduleProps {
    id?: number;
    working_hours: string;
    status: string;
    master: Master;
}

@EntityRepository(Schedule)
export class ScheduleRepository extends AbstractRepository<Schedule> {
    // Получить все расписания
    async findAll() {
        return await this.repository.find();
    }

    // Создать расписание
    async createAndSave(props: ScheduleProps) {
        const { working_hours, status, master } = props;
        const schedule = new Schedule();

        schedule.working_hours = working_hours;
        schedule.status = status;
        schedule.master = master;

        return await this.repository.save(schedule);
    }

    // Удалить расписание
    async delete(id: number) {
        // Проверка, есть ли расписание
        const schedule = await this.repository.findOne(id);
        if (!schedule) {
            throw new NotFoundError(404, 'Такого расписания не найдено');
        }

        return await this.repository.delete(id);
    }

    // Обновить расписание
    async updateAndSave(props: ScheduleProps) {
        const { id, working_hours, status, master } = props;

        const schedule = await this.repository.findOne(id);

        if (!schedule) {
            throw new NotFoundError(404, 'Такого расписания не найдено');
        }

        this.repository.merge(schedule, { working_hours, status, master });
        return await this.repository.save(schedule);
    }
}
