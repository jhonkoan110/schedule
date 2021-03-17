import { ServiceCatalog } from './ServiceCatalog';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Master } from './Master';

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @Column()
    description: string;

    @Column()
    start_date: string;

    @Column()
    end_date: string;

    @Column()
    status: string;

    @Column()
    status_color: string;

    @Column()
    commentary: string;

    @Column()
    photo: string;

    @OneToOne(() => Master)
    @JoinColumn()
    master: Master;

    @ManyToOne(() => ServiceCatalog, (service) => service.orders)
    service: ServiceCatalog;
}
