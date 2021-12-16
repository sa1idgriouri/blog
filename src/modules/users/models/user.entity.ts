/* eslint-disable prettier/prettier */
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { RoleUser } from "./role.enum";


@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string

    @Column({ unique: true })
    username: string

    @Column()
    email?: string

    @Column()
    password?: string

    @Column({ type: "enum", enum: RoleUser, default: RoleUser.USER })
    role: RoleUser

    @BeforeInsert()
    emailToLowerCase() {
        this.email = this.email.toLowerCase();
    }

}