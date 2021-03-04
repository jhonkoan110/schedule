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
