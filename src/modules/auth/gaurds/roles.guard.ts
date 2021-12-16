/* eslint-disable prettier/prettier */
import { Injectable, CanActivate, ExecutionContext, Inject, forwardRef } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { map, Observable } from 'rxjs';
import { User } from 'src/modules/users/models/user.model';
import { UsersService } from 'src/modules/users/services/users.service';


@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector, @Inject(forwardRef(() => UsersService)) private userService: UsersService) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get<string[]>("roles", context.getHandler());
        if (!roles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user: User = request.user;
        return this.userService.findOne(user.id).pipe(
            map((user: User) => {
                const hasRole = () => roles.indexOf(user.role) > -1
                let hasPermission = false;
                if (hasRole) {
                    return hasPermission = true
                }
                else

                    return user && hasPermission
            })
        )
    }
}