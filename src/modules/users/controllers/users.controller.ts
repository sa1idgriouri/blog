/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { UsersService } from '../services/users.service';

@Controller('api/users')
export class UsersController {
    constructor(private userService: UsersService) { }

    @Post()
    createUser(@Body() user: User): Promise<User> {
        return this.userService.createUsers(user)
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
