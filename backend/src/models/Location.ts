import {
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    ManyToOne,
    Tree,
    TreeChildren,
    TreeParent,
} from 'typeorm';
import { LocationType } from './LocationType';
import { Master } from './Master';

@Entity()
@Tree('nested-set')
export class Location {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    coordinates: string;

    @OneToMany(() => Master, (master) => master.location)
    @JoinColumn()
    masters: Master[];

    @ManyToOne(() => LocationType, (locationType) => locationType.id, {
        eager: true,
        nullable: false,
    })
    @JoinColumn()
    location_type: LocationType;

    @TreeChildren()
    children: Location[]

    @TreeParent()
    @JoinColumn()
    parent: Location

    // @ManyToOne(() => Location, (location) => location.id, { nullable: true })
    // @JoinColumn()
    // parent: Location;

    // @OneToMany(() => Location, location => location.parent)
    // @JoinColumn()
    // children: Location[];
}
