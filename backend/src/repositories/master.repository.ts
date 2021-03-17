import { DeleteError } from './../errors/deleteError';
import { Order } from './../models/Order';
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
    // Проверка, есть ли мастер
    const master = await getRepository(Master).findOne(id);
    if (!master) {
        throw new NotFoundError(404, 'Такого мастера не найдено');
    }

    // Проверка, есть ли ешё у мастера заказы
    const orders = await getRepository(Order).find({ where: { master: id } });
    if (orders.length > 0) {
        throw new DeleteError(400, 'У этого мастера ещё есть заказы');
    }

    return await getRepository(Master).delete(id);
};

// Обновить мастера
export const updateMaster = async (props: MasterProps) => {
    const { id, user, specialization, location } = props;
    const mastersRepository = getRepository(Master);
    const master = await mastersRepository.findOne(id);
    // Проверка, есть ли мастер
    if (!master) {
        throw new NotFoundError(404, 'Такого мастера не найдено');
    }

    mastersRepository.merge(master, { user, specialization, location });
    return await mastersRepository.save(master);
};
