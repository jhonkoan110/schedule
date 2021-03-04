import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './Role';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    login: string;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    middlename: string;

    @ManyToOne(() => Role, (role) => role.users)
    role: Role;
}
