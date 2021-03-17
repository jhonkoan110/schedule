import { DeleteError } from './../errors/deleteError';
import { NotFoundError } from './../errors/notFoundError';
import { User } from './../models/User';
import { AbstractRepository, EntityRepository, getRepository, getTreeRepository } from 'typeorm';
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

// // Получить одного пользователя
// export const getOneUser = async (login: string) => {
//     return await getRepository(User)
//         .createQueryBuilder('user')
//         .where('user.login = :login', { login })
//         .getOne();
// };

// // Получить всех пользователей
// export const getUsers = async () => {
//     try {
//         return await getRepository(User).find();
//     } catch (error) {
//         throw new Error(error.message);
//     }
// };

// // Создать пользователя
// export const createUser = async (props: UsersProps) => {
//     try {
//         const { login, password, firstname, lastname, middlename, role } = props;
//         const user = new User();

//         user.login = login;
//         user.password = password;
//         user.lastname = lastname;
//         user.firstname = firstname;
//         user.middlename = middlename;
//         user.role = role;

//         const usersRepository = getRepository(User);
//         return await usersRepository.save(user);
//     } catch (error) {
//         throw new Error(error.message);
//     }
// };

// // Удалить пользователя
// export const deleteUser = async (id: number) => {
//     // Проверка, есть ли пользователь
//     const user = await getRepository(User).findOne(id);
//     console.log(user);

//     if (!user) {
//         throw new NotFoundError(404, 'Такого пользователя не найдено');
//     }

//     return await getRepository(User).delete(id);
// };

// // Обновить пользователя
// export const updateUser = async (props: UsersProps) => {
//     const { id, login, firstname, lastname, middlename, role } = props;

//     const usersRepository = getRepository(User);
//     const user = await usersRepository.findOne(id);
//     // Проверка, есть ли пользователь
//     if (!user) {
//         throw new NotFoundError(404, 'Такого пользователя не найдено');
//     }

//     usersRepository.merge(user, { login, firstname, lastname, middlename, role });
//     return await usersRepository.save(user);
// };

@EntityRepository(User)
export class UserRepository extends AbstractRepository<User> {
    // Получить всех пользователей
    async findAll() {
        return await this.repository.find();
    }

    // Получить одного пользователя
    async findUserByLogin(login: string) {
        return await this.repository.findOne(login);
    }

    // Создать пользователя
    async createAndSave(props: UsersProps) {
        const { login, password, firstname, lastname, middlename, role } = props;
        const user = new User();

        user.login = login;
        user.password = password;
        user.lastname = lastname;
        user.firstname = firstname;
        user.middlename = middlename;
        user.role = role;

        return await this.repository.save(user);
    }

    // Удалить пользователя
    async delete(id: number) {
        // Проверка, есть ли пользователь
        const user = await this.repository.findOne(id);

        if (!user) {
            throw new NotFoundError(404, 'Такого пользователя не найдено');
        }

        return await this.repository.delete(id);
    }

    // Обновить пользователя
    async updateAndSave(props: UsersProps) {
        const { id, login, firstname, lastname, middlename, role } = props;

        const user = await this.repository.findOne(id);
        // Проверка, есть ли пользователь
        if (!user) {
            throw new NotFoundError(404, 'Такого пользователя не найдено');
        }

        this.repository.merge(user, { login, firstname, lastname, middlename, role });
        return await this.repository.save(user);
    }
}
