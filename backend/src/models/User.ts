import { Column, Entity, JoinColumn, JoinTable, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './Role';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    login: string;

    @Column()
    password: string;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    middlename: string;

    @ManyToOne(() => Role, (role) => role.id, { eager: true })
    @JoinColumn()
    role: Role;
}
