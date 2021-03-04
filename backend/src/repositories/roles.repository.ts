import { Role } from './../models/Role';
import { getRepository } from 'typeorm';

export interface RoleProps {
    id?: number;
    name: string;
    rights: string;
}

// Получить все роли
export const getRoles = async () => {
    return await getRepository(Role).find();
};

// Добавить роль
export const createRole = async (props: RoleProps) => {
    const { name, rights } = props;
    const role = new Role();
    role.name = name;
    role.rights = rights;

    const rolesRepository = getRepository(Role);
    await rolesRepository
        .save(role)
        .then((role) => console.log(role))
        .catch((error) => console.log(error));

    return role;
};

// Удалить роль
export const deleteRole = async (id: number) => {
    const rolesRepository = getRepository(Role);
    const deletedRole = await rolesRepository.delete(id);
    return deletedRole;
};

// Обновить роль
export const updateRole = async (props: RoleProps) => {
    const { id, name, rights } = props;

    const rolesRepository = getRepository(Role);
    const role = await rolesRepository.findOne(id);

    rolesRepository.merge(role, { name, rights });
    const result = await rolesRepository.save(role);

    return result;
};
