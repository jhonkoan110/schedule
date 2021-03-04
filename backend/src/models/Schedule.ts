import { Master } from './Master';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Schedule {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    working_hours: string;

    @Column()
    status: string;

    @OneToOne(() => Master)
    @JoinColumn()
    master: Master;
}
