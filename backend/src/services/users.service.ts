import { UserRepository, UsersProps } from './../repositories/users.repository';
import { getCustomRepository } from 'typeorm';

// Получить одлного пользователя
export const getOneUser = async (login: string) => {
    const userRepository = getCustomRepository(UserRepository);
    return await userRepository.findUserByLogin(login);
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
