/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { UsersService } from '../services/users.service';

@Controller('api/users')
export class UsersController {
    constructor(private userService: UsersService) { }

    @Post()
    createUser(@Body() user: User): Observable<User> {
        return this.userService.createUsers(user).pipe(
            map((user: User) => user)
        )
    }
    @Post("login")
    login(@Body() user: User): Observable<Object> {
        return this.userService.login(user).pipe(map((jwt: string) => {
            return { access_token: jwt }
        }))
    }
    @Get()
    findAll(): Observable<User[]> {
        return this.userService.findAll()
    }
    @Get(':id')
    findOne(@Param("id") id: string): Observable<User> {
        return this.userService.findOne(Number(id))
    }

    @Put(":id")
    updateOne(@Param('id') id: string, @Body() user: User): Observable<any> {
        return this.userService.update(Number(id), user)
    }

    @Delete(":id")
    deleteOne(@Param('id') id: number) {
        return this.userService.delete(id.toString())
    }
}
