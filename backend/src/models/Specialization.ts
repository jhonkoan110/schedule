import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Master } from './Master';

@Entity()
export class Specialization {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    icon: string;

    @OneToMany(() => Master, (master) => master.specialization)
    masters: Master[];
}
