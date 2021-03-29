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
import { User } from './User';
import { Location } from './Location';

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

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

    @OneToOne(() => Master, { eager: true })
    @JoinColumn()
    master: Master;

    @OneToOne(() => Location, { eager: true })
    @JoinColumn()
    location: Location;

    @ManyToOne(() => ServiceCatalog, (service) => service.orders, {
        eager: true,
    })
    @JoinColumn({ name: 'serviceId' })
    service: ServiceCatalog;

    @ManyToOne(() => User, (user) => user.orders, { eager: true })
    @JoinColumn()
    user: User;
}
