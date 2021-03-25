import { UserRepository, UsersProps } from './../repositories/users.repository';
import { getCustomRepository } from 'typeorm';
import * as ordersService from '../services/orders.service';

// Получить одного пользователя по логину
export const getOneUser = async (login: string) => {
    const userRepository = getCustomRepository(UserRepository);
    return await userRepository.findUserByLogin(login);
};

// Получить пользователя по id
export const getUserById = async (id: number) => {
    return await getCustomRepository(UserRepository).findUserById(id);

};

// Получить всех пользоваталей
export const getUsers = async () => {
    const userRepository = getCustomRepository(UserRepository);
    return await userRepository.findAll();
};

// Создать пользователя
export const createUser = async (props: UsersProps) => {
    const userRepository = getCustomRepository(UserRepository);
    return await userRepository.createAndSave(props);
};

// Удалить пользователя
export const deleteUser = async (id: number) => {
    const userRepository = getCustomRepository(UserRepository);
    return await userRepository.delete(id);
};

// Обновить пользователя
export const updateUser = async (props: UsersProps) => {
    const userRepository = getCustomRepository(UserRepository);
    return await userRepository.updateAndSave(props);
};
