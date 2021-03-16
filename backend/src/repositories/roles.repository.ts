import { DeleteError } from './../errors/deleteError';
import { User } from './../models/User';
import { NotFoundError } from './../errors/notFoundError';
import { Role } from './../models/Role';
import { getRepository } from 'typeorm';

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
    try {
        const rolesRepository = getRepository(Role);

        // Проверка, есть ли такая роль
        const role = await rolesRepository.findOne(id);

        if (!role) {
            throw new NotFoundError('Такой роли не найдено');
        }

        // Проверка, есть ли у роли пользователи
        const users = await getRepository(User).find({ where: { role: id } });
        console.log(users);

        if (users.length > 1) {
            throw new DeleteError('');
        }

        // Если роль есть, удалить её
        return await rolesRepository.delete(id);
    } catch (error) {
        if (Object.getPrototypeOf(error) === NotFoundError.prototype) {
            console.log(error.message);
        }
        // Если проверять с условием на сущность ошибки, то ничего не происходит

        // if (err instanceof NotFoundError) {
        //     console.log('Caught NotFoundError');

        //     throw new NotFoundError('Такой роли не найдено');
        // } else if (err instanceof DeleteError) {
        //     throw new DeleteError('У этой роли ещё есть пользователи');
        // } else {
        //     throw new Error(err.message);
        // }
    }
};

// Обновить роль
export const updateRole = async (props: RoleProps) => {
    try {
        const { id, name, rights } = props;
        const rolesRepository = getRepository(Role);

        // Проверка есть ли такая роль
        const role = await rolesRepository.findOne(id);
        if (!role) {
            throw new NotFoundError('');
        }

        // Если роль есть, обновить её
        rolesRepository.merge(role, { name, rights });
        const result = await rolesRepository.save(role);

        return result;
    } catch (err) {
        if (err instanceof NotFoundError) {
            throw new NotFoundError('Такой роли не найдено');
        } else {
            throw new Error(err.message);
        }
    }
};
