/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { from, Observable, throwError } from "rxjs";
import { AuthService } from "src/modules/auth/services/auth.service";
import { Repository } from "typeorm";
import { UserEntity } from "../models/user.entity";
import { User } from "../models/user.model";

import { switchMap, map, catchError } from 'rxjs/operators';


@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserEntity) private usersRepository: Repository<UserEntity>, private authService: AuthService) { }


    createUsers(user: User): Observable<User> {
        return this.authService.hasPassword(user.password).pipe(
            switchMap((passwordHash: string) => {
                const newUser = new UserEntity()
                newUser.name = user.name;
                newUser.username = user.username;
                newUser.email = user.email;
                newUser.password = passwordHash;

                return from(this.usersRepository.save(newUser)).pipe(
                    map((user: User) => {
                        const { password, ...result } = user;

                        return result;
                    }),
                    catchError(err => throwError(err))
                )

            })
        )
    }



    findAll(): Observable<User[]> {
        return from(this.usersRepository.find()).pipe(
            map((user: User[]) => {
                user.forEach(function (v) { delete v.password })
                return user
            })
        )
    }

    findOne(id: number): Observable<User> {
        return from(this.usersRepository.findOne(id)).pipe(
            map((user: User) => {
                const { password, ...result } = user;

                return result
            })
        )
    }

    delete(id: string): Observable<any> {
        return from(this.usersRepository.delete(id))
    }

    update(id: number, user: User): Observable<any> {
        delete user.email;
        delete user.password
        return from(this.usersRepository.update(id, user))
    }

    login(user: User) {
        return this.validationUser(user.email, user.password).pipe(
            switchMap((user: User) => {
                if (user)
                    return this.authService.generateJWT(user).pipe(map((jwt: string) => jwt))
                else
                    return 'Wrong Credentials';
            })
        )
    }

    validationUser(email: string, password: string): Observable<User> {
        return from(this.usersRepository.findOne({ email })).pipe(
            switchMap((user: User) =>
                this.authService.compareTo(password, user.password).pipe(
                    map((match: boolean) => {
                        if (match) {
                            const { password, ...result } = user
                            return result
                        }
                        else throw Error
                    })
                )
            )
        )
    }

    findByMail(email: string): Observable<User> {
        return from(this.usersRepository.findOne({ email }))
    }




}
