import { User } from './../models/User';
import { getRepository } from 'typeorm';
import { Role } from './../models/Role';

export interface UsersProps {
    id?: number;
    login: string;
    firstname: string;
    lastname: string;
    middlename: string;
    role: Role;
}

// Получить всех пользователей
export const getUsers = async () => {
    return await getRepository(User).find();
};

// Создать пользователя
export const createUser = async (props: UsersProps) => {
    const { login, firstname, lastname, middlename, role } = props;
    const user = new User();

    user.login = login;
    user.lastname = lastname;
    user.firstname = firstname;
    user.middlename = middlename;
    user.role = role;

    const usersRepository = getRepository(User);
    return await usersRepository.save(user);
};

// Удалить пользователя
export const deleteUser = async (id: number) => {
    return await getRepository(User).delete(id);
};

// Обновить пользователя
export const updateUser = async (props: UsersProps) => {
    const { id, login, firstname, lastname, middlename, role } = props;

    const usersRepository = getRepository(User);
    const user = await usersRepository.findOne(id);

    usersRepository.merge(user, { login, firstname, lastname, middlename, role });
    return await usersRepository.save(user);
};
