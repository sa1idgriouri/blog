/* eslint-disable prettier/prettier */
import { forwardRef, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from '../users/services/users.service';
import { UserModule } from '../users/user.module';
import { JwtAuthGuard } from './gaurds/jwt-gaurd';
import { JwtStrategy } from './gaurds/jwt.strategy';
import { RolesGuard } from './gaurds/roles.guard';
import { AuthService } from './services/auth.service';

@Module({

  imports: [
    forwardRef(() => UserModule),
    JwtModule.registerAsync({
      imports: [ConfigService],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get("JWT_SEACRET"),
        signOptions: { expiresIn: "1000000s" }
      })
    })],
  providers: [AuthService, JwtAuthGuard, JwtStrategy, RolesGuard],
  exports: [AuthService]
})
export class AuthModule { }
