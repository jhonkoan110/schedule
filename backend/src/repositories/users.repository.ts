import { NotFoundError } from '../errors/NotFoundError';
import { User } from './../models/User';
import { AbstractRepository, EntityRepository, getCustomRepository } from 'typeorm';
import { Role } from './../models/Role';
import { RoleRepository } from './roles.repository';

export interface UsersProps {
    id?: number;
    login: string;
    password: string;
    firstname: string;
    lastname: string;
    middlename: string;
    role: Role;
}

@EntityRepository(User)
export class UserRepository extends AbstractRepository<User> {
    // Получить всех пользователей
    async findAll() {
        return await this.repository.find();
    }

    // Получить одного пользователя
    async findUserByLogin(login: string) {
        const user = await this.repository.findOne({ where: { login } });
        // if (!user) {
        //     throw new NotFoundError(404, 'Пользователь с таким логином не найден');
        // }
        return user;
    }

    // Получить пользователей по роли
    async findUsersByRoleId(id: number) {
        return await this.repository.find({ where: { role: id } });
    }

    // Создать пользователя
    async createAndSave(props: UsersProps) {
        const { login, password, firstname, lastname, middlename, role } = props;
        const user = new User();
        console.log(user);

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
        const roleRepository = getCustomRepository(RoleRepository);
        const currentRole = await roleRepository.findRoleById(+role)
        user.role = currentRole;
        return await this.repository.save(user);
    }
}
