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

// Удалить роль
export const deleteRole = async (id: number) => {
    try {
        const rolesRepository = getRepository(Role);

        // Проверка, есть ли такая роль
        const role = await rolesRepository.findOne(id);
        if (!role) {
            throw new NotFoundError('');
        }

        // Если роль есть, удалить её
        return await rolesRepository.delete(id);
    } catch (err) {
        if (err instanceof NotFoundError) {
            throw new NotFoundError('Такой роли не найдено');
        } else {
            throw new Error(err.message);
        }
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
