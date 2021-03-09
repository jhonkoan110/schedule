import * as usersRepository from '../repositories/users.repository';

// Получить одлного пользователя
export const getOneUser = async (login: string) => {
    return await usersRepository.getOneUser(login);
};

// Получить всех пользоваталей
export const getUsers = async () => {
    return await usersRepository.getUsers();
};

// Создать пользователя
export const createUser = async (props: usersRepository.UsersProps) => {
    return await usersRepository.createUser(props);
};

// Удалить пользователя
export const deleteUser = async (id: number) => {
    return await usersRepository.deleteUser(id);
};

// Обновить пользователя
export const updateUser = async (props: usersRepository.UsersProps) => {
    return await usersRepository.updateUser(props);
};
