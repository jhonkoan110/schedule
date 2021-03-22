import { Permission } from './Permission';
import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @JoinTable()
    @ManyToMany(() => Permission, (permission) => permission.id)
    permissions: Permission[];
}
