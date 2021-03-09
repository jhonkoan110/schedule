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
    try {
        return await getRepository(Specialization).find();
    } catch (error) {
        throw new Error(error.message);
    }
};

// Создать специализацию
export const createSpecialization = async (props: SpecializationProps) => {
    try {
        const { name, icon } = props;
        const specialization = new Specialization();

        specialization.name = name;
        specialization.icon = icon;

        const specializationsRepository = getRepository(Specialization);
        return await specializationsRepository
            .save(specialization)
            .catch((err) => console.log(err));
    } catch (error) {
        throw new Error(error.message);
    }
};

// Удалить спец-ю
export const deleteSpecialization = async (id: number) => {
    try {
        const specializationsRepository = getRepository(Specialization);

        // Проверка, есть ли такая спец-я
        const specialization = specializationsRepository.findOne(id);
        if (!specialization) {
            throw new NotFoundError('');
        }

        // Если спец-я есть, удалить её
        return await specializationsRepository.delete(id);
    } catch (error) {
        if (error instanceof NotFoundError) {
            throw new NotFoundError('Такой специализации не найдено');
        } else {
            throw new Error(error.message);
        }
    }
};

// Обновить спец-ю
export const updateSpecialization = async (props: SpecializationProps) => {
    try {
        const { id, name, icon } = props;
        const specializationsRepository = getRepository(Specialization);

        // Проверка, есть ли такая спец-я
        const specialization = await specializationsRepository.findOne(id);
        if (!specialization) {
            throw new NotFoundError('');
        }

        specializationsRepository.merge(specialization, { name, icon });
        return await specializationsRepository.save(specialization);
    } catch (error) {
        if (error instanceof NotFoundError) {
            throw new NotFoundError('Такой специализации не найдено');
        } else {
            throw new Error(error.message);
        }
    }
};
