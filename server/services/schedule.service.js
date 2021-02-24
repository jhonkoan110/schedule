import * as scheduleRepository from '../repositories/schedule.repository';

// Получить все расписания
export const getAllSchedule = async () => {
    const schedule = await scheduleRepository.getAllSchedule();
    return schedule;
};

// Получить расписание мастера
export const getSchedule = async (master_id) => {
    const schedule = await scheduleRepository.getSchedule(master_id);
    return schedule;
};

// Создать расписание мастера
export const createSchedule = async (reqBody) => {
    const newSchedule = await scheduleRepository.createSchedule(reqBody);
    return newSchedule;
};

// Удалить расписание мастера
export const deleteSchedule = async (master_id) => {
    const deletedSchedule = await scheduleRepository.deleteSchedule(master_id);
    return deletedSchedule;
};
