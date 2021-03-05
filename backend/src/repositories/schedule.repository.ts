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
    return await getRepository(Schedule).find();
};

// Создать расписание
export const createSchedule = async (props: ScheduleProps) => {
    const { working_hours, status, master } = props;
    const schedule = new Schedule();

    schedule.working_hours = working_hours;
    schedule.status = status;
    schedule.master = master;

    return await getRepository(Schedule)
        .save(schedule)
        .catch((err) => console.log(err));
};

// Удалить расписание
export const deleteSchedule = async (id: number) => {
    return await getRepository(Schedule).delete(id);
};

// Обновить расписание
export const updateSchedule = async (props: ScheduleProps) => {
    const { id, working_hours, status, master } = props;

    const scheduleRepository = getRepository(Schedule);
    const schedule = await scheduleRepository.findOne(id);

    scheduleRepository.merge(schedule, { working_hours, status, master });
    return await scheduleRepository.save(schedule);
};
