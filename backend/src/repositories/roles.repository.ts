import { UserRepository } from './users.repository';
import { Role } from './../models/Role';
import { AbstractRepository, EntityRepository, getCustomRepository } from 'typeorm';
import { NotFoundError } from '../errors/notFoundError';
import { DeleteError } from '../errors/deleteError';

export interface RoleProps {
    id?: number;
    name: string;
    rights: string;
}

@EntityRepository(Role)
export class RoleRepository extends AbstractRepository<Role> {
    // Инициализировать роли по умолчанию
    async initiate(roles: Array<RoleProps>) {
        return await this.repository.save(roles);
    }

    // Получить все роли
    async findAll() {
        return await this.repository.find();
    }

    // Создать роль
    async createAndSave(props: RoleProps) {
        const { name, rights } = props;
        const role = new Role();
        role.name = name;
        role.rights = rights;

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
        const { id, name, rights } = props;

        // Проверка есть ли такая роль
        const role = await this.repository.findOne(id);
        if (!role) {
            throw new NotFoundError(404, 'Такой роли не найдено');
        }

        // Если роль есть, обновить её
        this.repository.merge(role, { name, rights });
        const result = await this.repository.save(role);

        return result;
    }
}
