import { getCustomRepository } from 'typeorm';
import { ScheduleProps, ScheduleRepository } from './../repositories/schedule.repository';

// Получить расписание
export const getSchedule = async () => {
    const scheduleRepository = getCustomRepository(ScheduleRepository);
    return await scheduleRepository.findAll();
};

// Создать расписание
export const createSchedule = async (props: ScheduleProps) => {
    const scheduleRepository = getCustomRepository(ScheduleRepository);
    return await scheduleRepository.createAndSave(props);
};

// Удалить расписание
export const deleteSchedule = async (id: number) => {
    const scheduleRepository = getCustomRepository(ScheduleRepository);
    return await scheduleRepository.delete(id);
};

// Обновить расписание
export const updateSchedule = async (props: ScheduleProps) => {
    const scheduleRepository = getCustomRepository(ScheduleRepository);
    return await scheduleRepository.updateAndSave(props);
};
