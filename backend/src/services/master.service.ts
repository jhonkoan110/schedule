import { MasterRepository, MasterProps } from './../repositories/master.repository';
import { getCustomRepository } from 'typeorm';

// Получить всех мастеров
export const getMasters = async () => {
    const masterRepository = getCustomRepository(MasterRepository);
    return await masterRepository.findAll();
};

// Создать мастера
export const createMaster = async (props: MasterProps) => {
    const masterRepository = getCustomRepository(MasterRepository);
    return await masterRepository.createAndSave(props);
};

// Удалить мастера
export const deleteMaster = async (id: number) => {
    const masterRepository = getCustomRepository(MasterRepository);
    return await masterRepository.delete(id);
};

// Обновить мастера
export const updateMaster = async (props) => {
    const masterRepository = getCustomRepository(MasterRepository);
    return await masterRepository.updateAndSave(props);
};
