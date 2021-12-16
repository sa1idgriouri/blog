/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from './modules/users/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersService } from './modules/users/services/users.service';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: "postgres",
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
    }),

    UserModule,
    AuthModule

  ],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {

}
