/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { from, Observable } from "rxjs";
import { Repository } from "typeorm";
import { UserEntity } from "../models/user.entity";
import { User } from "../models/user.model";


@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserEntity) private usersRepository: Repository<UserEntity>) { }


    createUsers(user: User): Promise<User> {
        return this.usersRepository.save(user)
    }

    findAll(): Observable<User[]> {
        return from(this.usersRepository.find())
    }

    findOne(id: number): Observable<User> {
        return from(this.usersRepository.findOne(id))
    }

    delete(id: string): Observable<any> {
        return from(this.usersRepository.delete(id))
    }

    update(id: number, user: User): Observable<any> {
        return from(this.usersRepository.update(id, user))
    }


}
