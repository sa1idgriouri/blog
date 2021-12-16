/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { from, Observable } from 'rxjs';
import { User } from 'src/modules/users/models/user.model';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {

    constructor(private jwtService: JwtService) { }

    generateJWT(user: User): Observable<string> {
        return from(this.jwtService.signAsync(user))
    }


    hasPassword(password: string): Observable<string> {
        return from<string>(bcrypt.hash(password, 12))
    }

    compareTo(newPassword: string, password: string): Observable<any | boolean> {
        return from(bcrypt.compare(newPassword, password))
    }
}
