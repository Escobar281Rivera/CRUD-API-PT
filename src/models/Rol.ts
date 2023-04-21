import {Entity, PrimaryGeneratedColumn, Column  } from "typeorm";

@Entity()
export class Rol{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    rol: string

    @Column({default: true})
    state: boolean
}