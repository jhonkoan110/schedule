import { RoleProps } from './../repositories/roles.repository';
import * as rolesRepository from '../repositories/roles.repository';

// Получить все роли
export const getRoles = async () => {
    return await rolesRepository.getRoles();
};

// Создать роль
export const createRole = async (props: RoleProps) => {
    return await rolesRepository.createRole(props);
};

// Получитель пользователей по роли
export const getUsersByRoleId = async (id: number) => {
    return await rolesRepository.getUsersByRoleId(id);
};

// Удалить роль
export const deleteRole = async (id: number) => {
    return await rolesRepository.deleteRole(id);
};

// Обновить роль
export const updateRole = async (props: RoleProps) => {
    return await rolesRepository.updateRole(props);
};
