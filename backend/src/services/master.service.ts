import * as mastersRepository from '../repositories/master.repository';

// Получить всех мастеров
export const getMasters = async () => {
    return await mastersRepository.getMasters();
};

// Создать мастера
export const createMaster = async (props: mastersRepository.MasterProps) => {
    return await mastersRepository.createMaster(props);
};
