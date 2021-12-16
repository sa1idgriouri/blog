/* eslint-disable prettier/prettier */
import { forwardRef, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../users/user.module';
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
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule { }
