import { DeleteError } from './../errors/deleteError';
import { Master } from './../models/Master';
import { NotFoundError } from './../errors/notFoundError';
import { Specialization } from './../models/Specialization';
import { getRepository, Not } from 'typeorm';

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

    // Проверка, есть ли такая спец-я
    const specialization = await specializationsRepository.findOne(id);
    if (!specialization) {
        throw new NotFoundError(404, 'Такой специализации не найдено');
    }

    // Проверка, есть ли ещё мастера у этой спец-и
    const masters = await getRepository(Master).find({ where: { specialization: id } });
    if (masters.length > 0) {
        throw new DeleteError(400, 'У этой специализации ещё есть мастера');
    }

    // Если спец-я есть, удалить её
    return await specializationsRepository.delete(id);
};

// Обновить спец-ю
export const updateSpecialization = async (props: SpecializationProps) => {
    const { id, name, icon } = props;
    const specializationsRepository = getRepository(Specialization);

    // Проверка, есть ли такая спец-я
    const specialization = await specializationsRepository.findOne(id);
    if (!specialization) {
        throw new NotFoundError(404, 'Такой специализации не найдено');
    }

    specializationsRepository.merge(specialization, { name, icon });
    return await specializationsRepository.save(specialization);
};
