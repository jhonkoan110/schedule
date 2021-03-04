import { Specialization } from './../models/Specialization';
import { getRepository } from 'typeorm';

export interface SpecializationProps {
    id?: number;
    name: string;
    icon: string;
}

// Получить все специализации
export const getSpecializations = async () => {
    return await getRepository(Specialization).find();
};

// Создать специализацию
export const createSpecialization = async (props: SpecializationProps) => {
    const { name, icon } = props;
    const specialization = new Specialization();

    specialization.name = name;
    specialization.icon = icon;

    const specializationsRepository = getRepository(Specialization);
    return await specializationsRepository.save(specialization).catch((err) => console.log(err));
};

// Удалить спец-ю
export const deleteSpecialization = async (id: number) => {
    const specializationsRepository = getRepository(Specialization);
    return await specializationsRepository.delete(id);
};

// Обновить спец-ю
export const updateSpecialization = async (props: SpecializationProps) => {
    const { id, name, icon } = props;

    const specializationsRepository = getRepository(Specialization);
    const specialization = await specializationsRepository.findOne(id);

    specializationsRepository.merge(specialization, { name, icon });
    return await specializationsRepository.save(specialization);
};
