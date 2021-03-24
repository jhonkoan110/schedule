import { Permission } from './../models/Permission';
import { UserRepository } from './users.repository';
import { Role } from './../models/Role';
import {
    AbstractRepository,
    EntityRepository,
    getCustomRepository,
} from 'typeorm';
import { NotFoundError } from '../errors/NotFoundError';
import { DeleteError } from '../errors/DeleteError';

export interface RoleProps {
    id?: number;
    name: string;
    permissions: Array<Permission>;
}

@EntityRepository(Role)
export class RoleRepository extends AbstractRepository<Role> {
    // Инициализировать роли по умолчанию
    async initiate(roles: Array<RoleProps>) {
        return await this.repository.save(roles);
    }

    // Получить одну роль по id
    async findRoleById(id: number) {
        return await this.repository.findOne(id);
    }

    // Получить все роли
    async findAll() {
        return await this.repository.find();
    }

    // Создать роль
    async createAndSave(props: RoleProps) {
        const { name, permissions } = props;
        const role = new Role();
        role.name = name;
        role.permissions = permissions;

        return await this.repository.save(role);
    }

    // Удалить роль
    async delete(id: number) {
        // Проверка, есть ли такая роль
        const role = await this.repository.findOne(id);

        if (!role) {
            throw new NotFoundError(404, 'Такой роли не найдено');
        }

        // Проверка, есть ли у роли пользователи
        const userRepository = getCustomRepository(UserRepository);
        const users = await userRepository.findUsersByRoleId(id);

        if (users.length > 1) {
            throw new DeleteError(400, 'У этой роли ещё есть пользователи');
        }

        // Если роль есть, удалить её
        return await this.repository.delete(id);
    }

    // Обновить роль
    async updateAndSave(props: RoleProps) {
        const { id, name, permissions } = props;

        // Проверка есть ли такая роль
        const role = await this.repository.findOne(id);
        if (!role) {
            throw new NotFoundError(404, 'Такой роли не найдено');
        }

        // Если роль есть, обновить её
        this.repository.merge(role, { name, permissions });
        const result = await this.repository.save(role);

        return result;
    }
}
