import { Order } from './Order';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

    @ManyToOne(() => Order, (order) => order.services)
    order: Order;
}
