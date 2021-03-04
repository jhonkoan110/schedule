import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
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

    @OneToOne(() => LocationType)
    @JoinColumn()
    location_type: LocationType;

    @OneToOne(() => Location)
    @JoinColumn()
    parent: Location;
}
