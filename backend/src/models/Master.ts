import { Location } from './Location';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Specialization } from './Specialization';
import { User } from './User';

@Entity()
export class Master {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;

    @ManyToOne(() => Specialization, (specialization) => specialization.masters)
    specialization: Specialization;

    @ManyToOne(() => Location, (location) => location.masters)
    location: Location;
}
