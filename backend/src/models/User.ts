import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './Order';
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

    @OneToMany(() => Order, (order) => order.id)
    orders: Order[];

    @ManyToOne(() => Role, (role) => role.id, { eager: true })
    @JoinColumn()
    role: Role;
}
