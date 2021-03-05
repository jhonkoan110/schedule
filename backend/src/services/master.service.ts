import * as mastersRepository from '../repositories/master.repository';

// Получить всех мастеров
export const getMasters = async () => {
    return await mastersRepository.getMasters();
};

// Создать мастера
export const createMaster = async (props: mastersRepository.MasterProps) => {
    return await mastersRepository.createMaster(props);
};

// Удалить мастера
export const deleteMaster = async (id: number) => {
    return await mastersRepository.deleteMaster(id);
};

// Обновить мастера
export const updateMaster = async (props: mastersRepository.MasterProps) => {
    return await mastersRepository.updateMaster(props);
};
