import { Order } from './Order';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ServiceCatalog {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    duration: string;

    @Column()
    specialization: string;

    @OneToMany(() => Order, (order) => order.service)
    orders: Order;
}
