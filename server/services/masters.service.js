import * as mastersRepository from '../repositories/masters.repository';

// Получить всех мастеров
export const getMasters = async () => {
    const masters = await mastersRepository.getMasters();
    return masters;
};

// Создать мастера
export const createMaster = async (data) => {
    const newMaster = await mastersRepository.createMaster(data);
    return newMaster;
};

// Удалить мастера
export const deleteMaster = async (id) => {
    const deletedMaster = await mastersRepository.deleteMaster(id);
    return deletedMaster;
};
