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
    return await getRepository(Master).find();
};

// Создать мастера
export const createMaster = async (props: MasterProps) => {
    const { user, specialization, location } = props;
    const master = new Master();

    master.user = user;
    master.specialization = specialization;
    master.location = location;

    return await getRepository(Master).save(master);
};

// Удалить мастера
export const deleteMaster = async (id: number) => {
    return await getRepository(Master).delete(id);
};

// Обновить мастера
export const updateMaster = async (props: MasterProps) => {
    const { id, user, specialization, location } = props;
    const mastersRepository = getRepository(Master);
    const master = await mastersRepository.findOne(id);

    mastersRepository.merge(master, { user, specialization, location });
    return await mastersRepository.save(master);
};
