import * as specializationsRepository from '../repositories/specializations.repository';

// Получить все спец-и
export const getSpecializations = async () => {
    const specializations = await specializationsRepository.getSpecializations();
    return specializations;
};

// Создать спец-ю
export const createSpecialization = async (data) => {
    const newSpec = await specializationsRepository.createSpecialization(data);
    return newSpec;
};

// Удалить спец-ю
export const deleteSpecialization = async (id) => {
    const spec = await specializationsRepository.deleteSpecialization(id);
    return spec;
};
