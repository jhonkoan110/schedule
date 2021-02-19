import * as usersRepository from '../repositories/users.repository';

// Получить пользователя
export const getOneUser = async (login) => {
    const user = await usersRepository.getOneUser(login);
    return user;
};

// Создать пользователя
export const createUser = async (user) => {
    // console.log(user);
    const newUser = await usersRepository.createUser(user);
    return newUser;
};
