import { User } from './../models/User';
import { Role } from './../models/Role';
import { getRepository } from 'typeorm';
import { NotFoundError } from '../errors/notFoundError';
import { DeleteError } from '../errors/deleteError';

export interface RoleProps {
    id?: number;
    name: string;
    rights: string;
}

// Получить все роли
export const getRoles = async () => {
    try {
        return await getRepository(Role).find();
    } catch (error) {
        throw new Error(error.message);
    }
};

// Создать роль
export const createRole = async (props: RoleProps) => {
    try {
        const { name, rights } = props;
        const role = new Role();
        role.name = name;
        role.rights = rights;

        const rolesRepository = getRepository(Role);
        await rolesRepository.save(role).catch((error) => console.log(error));

        return role;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Получить всех пользователей по роли
export const getUsersByRoleId = async (id: number) => {
    const users = await getRepository(User).find({ where: { role: id } });
    console.log(users);

    return users;
};

// Удалить роль
export const deleteRole = async (id: number) => {
    const rolesRepository = getRepository(Role);

    // Проверка, есть ли такая роль
    const role = await rolesRepository.findOne(id);

    if (!role) {
        throw new NotFoundError(404, 'Такой роли не найдено');
    }

    // Проверка, есть ли у роли пользователи
    const users = await getRepository(User).find({ where: { role: id } });
    console.log(users);

    if (users.length > 1) {
        throw new DeleteError(400, 'У этой роли ещё есть пользователи');
    }

    // Если роль есть, удалить её
    return await rolesRepository.delete(id);
};

// Обновить роль
export const updateRole = async (props: RoleProps) => {
    const { id, name, rights } = props;
    const rolesRepository = getRepository(Role);

    // Проверка есть ли такая роль
    const role = await rolesRepository.findOne(id);
    if (!role) {
        throw new NotFoundError(404, 'Такой роли не найдено');
    }

    // Если роль есть, обновить её
    rolesRepository.merge(role, { name, rights });
    const result = await rolesRepository.save(role);

    return result;
};
