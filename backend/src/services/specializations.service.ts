import {
    SpecializationProps,
    SpecializationRepository,
} from './../repositories/specializations.repository';
import { getCustomRepository } from 'typeorm';

// Получить все специализации
export const getSpecializations = async () => {
    const specRepository = getCustomRepository(SpecializationRepository);
    return await specRepository.findAll();
};

// Создать спец-ю
export const createSpecialization = async (props: SpecializationProps) => {
    const { name, icon } = props;
    const specRepository = getCustomRepository(SpecializationRepository);
    return await specRepository.createAndSave(name, icon);
};

// Удалить спец-ю
export const deleteSpecialization = async (id: number) => {
    const specRepostitory = getCustomRepository(SpecializationRepository);
    return await specRepostitory.delete(id);
};

// Обновить спец-ю
export const updateSpecialization = async (props: SpecializationProps) => {
    const specRepostitory = getCustomRepository(SpecializationRepository);
    return await specRepostitory.updateAndSave(props);
};

// Получить спец-ю по имени
export const findByName = async (name: string) => {
    const specRepostitory = getCustomRepository(SpecializationRepository);
    const spec = await specRepostitory.findByName(name);
    return spec;
};
