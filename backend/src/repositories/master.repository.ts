import { NotFoundError } from './../errors/notFoundError';
import { User } from './../models/User';
import { getRepository } from 'typeorm';
import { Master } from '../models/Master';
import { Specialization } from '../models/Specialization';
import { Location } from '../models/Location';

export interface MasterProps {
    id?: number;
    user: User;
    specialization: Specialization;
    location: Location;
}

// Получить всех мастеров
export const getMasters = async () => {
    try {
        return await getRepository(Master).find();
    } catch (error) {
        throw new Error(error.message);
    }
};

// Создать мастера
export const createMaster = async (props: MasterProps) => {
    try {
        const { user, specialization, location } = props;
        const master = new Master();

        master.user = user;
        master.specialization = specialization;
        master.location = location;

        return await getRepository(Master).save(master);
    } catch (error) {
        throw new Error(error.message);
    }
};

// Удалить мастера
export const deleteMaster = async (id: number) => {
    try {
        // Проверка, есть ли мастер
        const master = await getRepository(Master).findOne(id);
        if (!master) {
            throw new NotFoundError('');
        }

        return await getRepository(Master).delete(id);
    } catch (error) {
        if (error instanceof NotFoundError) {
            throw new NotFoundError('Такого мастера не найдено');
        } else {
            throw new Error(error.message);
        }
    }
};

// Обновить мастера
export const updateMaster = async (props: MasterProps) => {
    try {
        const { id, user, specialization, location } = props;
        const mastersRepository = getRepository(Master);
        const master = await mastersRepository.findOne(id);
        // Проверка, есть ли мастер
        if (!master) {
            throw new NotFoundError('');
        }

        mastersRepository.merge(master, { user, specialization, location });
        return await mastersRepository.save(master);
    } catch (error) {
        if (error instanceof NotFoundError) {
            throw new NotFoundError('Такого мастера не найдено');
        } else {
            throw new Error(error.message);
        }
    }
};
