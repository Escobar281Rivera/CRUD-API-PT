import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, RelationId } from "typeorm";
import { Rol } from "./Rol";
import bcrypt from 'bcrypt'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Rol)
    rol: Rol

    @RelationId((user: User) => user.rol)
    rolId: number

    @Column()
    email: string

    @Column()
    pass: string

    @Column({ default: true })
    state: boolean

    //encriptacion de contraseña
    hashPassword(): void {
        const salt = bcrypt.genSaltSync(10)
        this.pass = bcrypt.hashSync(this.pass, salt)
    }
}
