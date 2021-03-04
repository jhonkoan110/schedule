import * as usersRepository from '../repositories/users.repository';

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
