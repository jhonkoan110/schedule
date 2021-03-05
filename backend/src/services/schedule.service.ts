import { ScheduleProps } from './../repositories/schedule.repository';
import * as scheduleRepository from '../repositories/schedule.repository';

// Получить расписание
export const getSchedule = async () => {
    return await scheduleRepository.getSchedule();
};

// Создать расписание
export const createSchedule = async (props: ScheduleProps) => {
    return await scheduleRepository.createSchedule(props);
};

// Удалить расписание
export const deleteSchedule = async (id: number) => {
    return await scheduleRepository.deleteSchedule(id);
};

// Обновить расписание
export const updateSchedule = async (props: ScheduleProps) => {
    return await scheduleRepository.updateSchedule(props);
};
