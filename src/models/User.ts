import { Entity, PrimaryGeneratedColumn,Column,ManyToOne, RelationId } from "typeorm";
import { Rol } from "./Rol";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(()=> Rol)
    rol: Rol

    @RelationId((user: User) => user.rol)
    rolId: number

    @Column()
    name: string

    @Column()
    last:string

    @Column()
    age: number

    @Column({ default: true})
    state: boolean
}
