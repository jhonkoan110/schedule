import { getCustomRepository } from 'typeorm';
import { RoleProps, RoleRepository } from './../repositories/roles.repository';

// Получить все роли
export const getRoles = async () => {
    const roleRepository = getCustomRepository(RoleRepository);
    return await roleRepository.findAll();
};

// Создать роль
export const createRole = async (props: RoleProps) => {
    const roleRepository = getCustomRepository(RoleRepository);
    return await roleRepository.createAndSave(props);
};

// Удалить роль
export const deleteRole = async (id: number) => {
    const roleRepository = getCustomRepository(RoleRepository);
    return await roleRepository.delete(id);
};

// Обновить роль
export const updateRole = async (props: RoleProps) => {
    const roleRepository = getCustomRepository(RoleRepository);
    return await roleRepository.updateAndSave(props);
};
