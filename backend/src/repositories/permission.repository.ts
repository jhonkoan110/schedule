import { Permission } from './../models/Permission';
import { AbstractRepository, EntityRepository } from 'typeorm';

@EntityRepository(Permission)
export class PermissionRepository extends AbstractRepository<Permission> {
    // Инициализировать роли по умолчанию
    async initiate(roles: Permission[]) {
        return await this.repository.save(roles);
    }
}
