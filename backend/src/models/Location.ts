import {
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    ManyToOne,
} from 'typeorm';
import { LocationType } from './LocationType';
import { Master } from './Master';

@Entity()
export class Location {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    coordinates: string;

    @OneToMany(() => Master, (master) => master.location)
    masters: Master[];

    @ManyToOne(() => LocationType, (locationType) => locationType.id, {
        eager: true,
        nullable: false,
    })
    @JoinColumn()
    location_type: LocationType;

    @ManyToOne(() => Location, (location) => location.id, { nullable: true })
    @JoinColumn()
    parent: Location;
}
