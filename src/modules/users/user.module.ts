/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { UsersController } from './controllers/users.controller';
import { UserEntity } from './models/user.entity';
import { UsersService } from './services/users.service';


@Module({
    imports: [TypeOrmModule.forFeature([UserEntity]), AuthModule],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService]
})

export class UserModule {

}
