import * as rolesRepository from '../repositories/roles.repository';

// Получить все роли
export const getRoles = async () => {
    const roles = await rolesRepository.getRoles();
    return roles;
};

// Создать роль
export const createRole = async (name, rights) => {
    const newRole = await rolesRepository.createRole(name, rights);
    return newRole;
};

// Удалить роль
export const deleteRole = async (role_id) => {
    const deletedRole = await rolesRepository.deleteRole(role_id);
    return deletedRole;
};
