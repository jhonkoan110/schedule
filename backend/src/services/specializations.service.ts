import { SpecializationProps } from './../repositories/specializations.repository';
import * as specializationsRepository from '../repositories/specializations.repository';

// Получить все специализации
export const getSpecializations = async () => {
    return await specializationsRepository.getSpecializations();
};

// Создать спец-ю
export const createSpecialization = async (props: SpecializationProps) => {
    return await specializationsRepository.createSpecialization(props);
};

// Удалить спец-ю
export const deleteSpecialization = async (id: number) => {
    return await specializationsRepository.deleteSpecialization(id);
};

// Обновить спец-ю
export const updateSpecialization = async (props: SpecializationProps) => {
    return await specializationsRepository.updateSpecialization(props);
};
