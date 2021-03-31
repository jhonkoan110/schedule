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
    Index,
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

    @Column({ nullable: true })
    location_type_id: number;

    @OneToMany(() => Master, (master) => master.location)
    @JoinColumn()
    masters: Master[];

    @ManyToOne(() => LocationType, (locationType) => locationType.id, {
        eager: true,
        nullable: false,
    })
    @JoinColumn({ name: 'location_type_id' })
    location_type: LocationType;

    @TreeChildren({ cascade: true })
    children: Location[];

    @TreeParent()
    parent: Location;
}
