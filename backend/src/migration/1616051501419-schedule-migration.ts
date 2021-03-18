import { RoleSeed } from './../seeds/roles.seed';
import { RoleRepository } from './../repositories/roles.repository';
import { getCustomRepository, MigrationInterface, QueryRunner } from 'typeorm';

export class scheduleMigration1616051501419 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const roles = await getCustomRepository(RoleRepository).initiate(RoleSeed);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
