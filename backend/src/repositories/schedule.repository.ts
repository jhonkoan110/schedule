import { NotFoundError } from './../errors/notFoundError';
import { Schedule } from './../models/Schedule';
import { getRepository } from 'typeorm';
import { Master } from './../models/Master';

export interface ScheduleProps {
    id?: number;
    working_hours: string;
    status: string;
    master: Master;
}

// Получить всё расписание
export const getSchedule = async () => {
    try {
        return await getRepository(Schedule).find();
    } catch (error) {
        throw new Error(error.message);
    }
};

// Создать расписание
export const createSchedule = async (props: ScheduleProps) => {
    try {
        const { working_hours, status, master } = props;
        const schedule = new Schedule();

        schedule.working_hours = working_hours;
        schedule.status = status;
        schedule.master = master;

        return await getRepository(Schedule).save(schedule);
    } catch (error) {
        throw new Error(error.message);
    }
};

// Удалить расписание
export const deleteSchedule = async (id: number) => {
    try {
        // Проверка, есть ли расписание
        const schedule = await getRepository(Schedule).findOne(id);
        if (!schedule) {
            throw new NotFoundError('');
        }

        return await getRepository(Schedule).delete(id);
    } catch (error) {
        if (error instanceof NotFoundError) {
            throw new NotFoundError('Такой роли не найдено');
        } else {
            throw new Error(error.message);
        }
    }
};

// Обновить расписание
export const updateSchedule = async (props: ScheduleProps) => {
    try {
        const { id, working_hours, status, master } = props;

        const scheduleRepository = getRepository(Schedule);
        const schedule = await scheduleRepository.findOne(id);

        if (!schedule) {
            throw new NotFoundError('');
        }

        scheduleRepository.merge(schedule, { working_hours, status, master });
        return await scheduleRepository.save(schedule);
    } catch (error) {
        if (error instanceof NotFoundError) {
            throw new NotFoundError('Такой роли не найдено');
        } else {
            throw new Error(error.message);
        }
    }
};
