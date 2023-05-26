import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Unique(['email'])
    email: string;

    @Column()
    password: string;

    @Column({ default: '' })
    favorite: string;
}
