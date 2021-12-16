/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable prettier/prettier */
import { Body, Controller, DefaultValuePipe, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { map, Observable } from 'rxjs';
import { hasRoles } from 'src/modules/auth/decoretors/role.decoretor';
import { JwtAuthGuard } from 'src/modules/auth/gaurds/jwt-gaurd';
import { RolesGuard } from 'src/modules/auth/gaurds/roles.guard';
import { RoleUser } from '../models/role.enum';
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
    @hasRoles(RoleUser.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    ndex(
        @Query('page') page = 1,
        @Query('limit') limit = 10,
    ): Observable<Pagination<User>> {
        limit = limit > 100 ? 100 : limit;
        return this.userService.paginate({ page: Number(page), limit: Number(limit), route: "http://localhost:5000/api/users" }).pipe(

        )
    }
    @Get(':id')
    findOne(@Param("id") id: string): Observable<User> {
        return this.userService.findOne(Number(id))
    }

    @Put(":id")
    updateOne(@Param('id') id: string, @Body() user: User): Observable<any> {
        return this.userService.update(Number(id), user)
    }
    @hasRoles(RoleUser.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':id/role')
    updateRoleUser(@Param('id') id: string, @Body() user: User): Observable<User> {
        return this.userService.updateRoleUser(Number(id), user)
    }

    @Delete(":id")
    deleteOne(@Param('id') id: number) {
        return this.userService.delete(id.toString())
    }
}
