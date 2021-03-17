import { DeleteError } from './../errors/deleteError';
import { NotFoundError } from './../errors/notFoundError';
import { User } from './../models/User';
import { getRepository, getTreeRepository } from 'typeorm';
import { Role } from './../models/Role';

export interface UsersProps {
    id?: number;
    login: string;
    password: string;
    firstname: string;
    lastname: string;
    middlename: string;
    role: Role;
}

// Получить одного пользователя
export const getOneUser = async (login: string) => {
    return await getRepository(User)
        .createQueryBuilder('user')
        .where('user.login = :login', { login })
        .getOne();
};

// Получить всех пользователей
export const getUsers = async () => {
    try {
        return await getRepository(User).find();
    } catch (error) {
        throw new Error(error.message);
    }
};

// Создать пользователя
export const createUser = async (props: UsersProps) => {
    try {
        const { login, password, firstname, lastname, middlename, role } = props;
        const user = new User();

        user.login = login;
        user.password = password;
        user.lastname = lastname;
        user.firstname = firstname;
        user.middlename = middlename;
        user.role = role;

        const usersRepository = getRepository(User);
        return await usersRepository.save(user);
    } catch (error) {
        throw new Error(error.message);
    }
};

// Удалить пользователя
export const deleteUser = async (id: number) => {
    // Проверка, есть ли пользователь
    const user = await getRepository(User).findOne(id);
    console.log(user);

    if (!user) {
        throw new NotFoundError(404, 'Такого пользователя не найдено');
    }

    return await getRepository(User).delete(id);
};

// Обновить пользователя
export const updateUser = async (props: UsersProps) => {
    const { id, login, firstname, lastname, middlename, role } = props;

    const usersRepository = getRepository(User);
    const user = await usersRepository.findOne(id);
    // Проверка, есть ли пользователь
    if (!user) {
        throw new NotFoundError(404, 'Такого пользователя не найдено');
    }

    usersRepository.merge(user, { login, firstname, lastname, middlename, role });
    return await usersRepository.save(user);
};
