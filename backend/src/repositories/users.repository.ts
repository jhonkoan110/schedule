import { NotFoundError } from './../errors/notFoundError';
import { User } from './../models/User';
import { getRepository, getTreeRepository } from 'typeorm';
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
    try {
        return await getRepository(User).find();
    } catch (error) {
        throw new Error(error.message);
    }
};

// Создать пользователя
export const createUser = async (props: UsersProps) => {
    try {
        const { login, firstname, lastname, middlename, role } = props;
        const user = new User();

        user.login = login;
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
    try {
        // Проверка, есть ли пользователь
        const user = await getTreeRepository(User).findOne(id);
        if (!user) {
            throw new NotFoundError('');
        }

        return await getRepository(User).delete(id);
    } catch (error) {
        if (error instanceof NotFoundError) {
            throw new NotFoundError('Такого пользователя не найдено');
        } else {
            throw new Error(error.message);
        }
    }
};

// Обновить пользователя
export const updateUser = async (props: UsersProps) => {
    try {
        const { id, login, firstname, lastname, middlename, role } = props;

        const usersRepository = getRepository(User);
        const user = await usersRepository.findOne(id);
        // Проверка, есть ли пользователь
        if (!user) {
            throw new NotFoundError('');
        }

        usersRepository.merge(user, { login, firstname, lastname, middlename, role });
        return await usersRepository.save(user);
    } catch (error) {
        if (error instanceof NotFoundError) {
            throw new NotFoundError('Такого пользователя не найдено');
        } else {
            throw new Error(error.message);
        }
    }
};
