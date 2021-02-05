import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { DatabaseModule, LogModule } from '../core';
import {
  AuthService,
  UserService,
  UserDatabaseService,
  getAuthConfig,
  JwtAuthGuard,
  JwtStrategy,
  LocalStrategy,
} from './common';
import { LoginController, UserController, UserRestDtoService } from './rest';
import { UserResolver } from './graphql';

const { jwt, passport } = getAuthConfig();

@Module({
  imports: [
    ConfigModule.forRoot({ load: [getAuthConfig] }),
    DatabaseModule,
    LogModule,
    PassportModule.register(passport),
    JwtModule.register(jwt),
  ],
  providers: [
    UserResolver,
    AuthService,
    UserService,
    UserDatabaseService,
    UserRestDtoService,
    JwtStrategy,
    LocalStrategy,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
  controllers: [LoginController, UserController],
})
export class UserModule {}
