import { Order } from './Order';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Timestamp } from 'typeorm';
import { Specialization } from './Specialization';

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

    @OneToOne(() => Specialization, specialization => specialization.id, {eager:true})
    @JoinColumn()
    specialization: Specialization;

    @OneToMany(() => Order, (order) => order.service)
    orders: Order;
}
